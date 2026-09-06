mod rules;
use axum::{
    Router,
    extract::{
        State,
        ws::{Message, WebSocket, WebSocketUpgrade},
    },
    http::{HeaderMap, StatusCode},
    response::{IntoResponse, Response},
    routing::get,
};
use serde::Deserialize;
use serde_json::{Value, json};
use std::{
    collections::HashMap,
    sync::{
        Arc,
        atomic::{AtomicBool, Ordering},
    },
    time::{Duration, Instant},
};
use tokio::sync::{Mutex, Semaphore, mpsc, watch};
use uuid::Uuid;

type Route = Option<mpsc::Sender<RoomEvent>>;
#[derive(Clone)]
struct Player {
    id: Uuid,
    tx: mpsc::Sender<Value>,
    route: watch::Sender<Route>,
    alive: Arc<AtomicBool>,
}
#[derive(Clone)]
struct App {
    waiting: Arc<Mutex<HashMap<String, Player>>>,
    slots: Arc<Semaphore>,
    origins: Arc<Vec<String>>,
    db: mpsc::Sender<Value>,
    passages: Arc<Vec<Passage>>,
}
#[derive(Clone, Deserialize)]
struct Passage {
    title: String,
    text: String,
    language: String,
}
#[derive(Deserialize)]
#[serde(tag = "type", rename_all = "snake_case")]
enum Command {
    Queue { language: String },
    Input { seq: u64, value: String },
    Ping,
    Leave,
}
enum RoomEvent {
    Input(Uuid, u64, String),
    Leave(Uuid),
}

fn send(player: &Player, value: Value) {
    if player.tx.try_send(value).is_err() {
        player.alive.store(false, Ordering::Relaxed);
    }
}
async fn upgrade(State(app): State<App>, headers: HeaderMap, ws: WebSocketUpgrade) -> Response {
    let origin = headers
        .get("origin")
        .and_then(|h| h.to_str().ok())
        .unwrap_or("");
    if !app.origins.iter().any(|o| o == origin) {
        return StatusCode::FORBIDDEN.into_response();
    }
    let Ok(permit) = app.slots.clone().try_acquire_owned() else {
        return StatusCode::SERVICE_UNAVAILABLE.into_response();
    };
    ws.max_message_size(512)
        .max_frame_size(512)
        .on_upgrade(move |socket| async move {
            let _permit = permit;
            connection(socket, app).await;
        })
}
async fn connection(mut socket: WebSocket, app: App) {
    let (tx, mut rx) = mpsc::channel(64);
    let (route, route_rx) = watch::channel(None);
    let player = Player {
        id: Uuid::new_v4(),
        tx,
        route,
        alive: Arc::new(AtomicBool::new(true)),
    };
    let mut joined = false;
    let mut heartbeat = tokio::time::interval(Duration::from_secs(10));
    let mut last_seen = Instant::now();
    let mut rate_start = Instant::now();
    let mut messages = 0;
    loop {
        tokio::select! {
            _ = heartbeat.tick() => {
                if last_seen.elapsed() > Duration::from_secs(35) || !player.alive.load(Ordering::Relaxed) { break; }
                if socket.send(Message::Ping(Vec::new().into())).await.is_err() { break; }
            }
            Some(value) = rx.recv() => {
                if !matches!(tokio::time::timeout(Duration::from_secs(3), socket.send(Message::Text(value.to_string().into()))).await, Ok(Ok(()))) { break; }
            }
            incoming = socket.recv() => {
                let Some(Ok(message)) = incoming else { break; };
                last_seen = Instant::now();
                let Message::Text(text) = message else {
                    if matches!(message, Message::Close(_)) { break; }
                    continue;
                };
                if rate_start.elapsed() >= Duration::from_secs(1) { rate_start = Instant::now(); messages = 0; }
                messages += 1;
                if messages > 60 { break; }
                let Ok(command) = serde_json::from_str::<Command>(&text) else { break; };
                match command {
                    Command::Queue { language } if !joined && (language == "en" || language == "ko") => {
                        joined = true;
                        let mut waiting = app.waiting.lock().await;
                        waiting.retain(|_, p| p.alive.load(Ordering::Relaxed));
                        if let Some(other) = waiting.remove(&language) {
                            let pool: Vec<_> = app.passages.iter().filter(|p| p.language == language).collect();
                            let passage = pool[rand::random_range(0..pool.len())].clone();
                            let (room_tx, room_rx) = mpsc::channel(128);
                            let _ = other.route.send(Some(room_tx.clone()));
                            let _ = player.route.send(Some(room_tx));
                            tokio::spawn(room([other, player.clone()], passage, room_rx, app.db.clone()));
                        } else { waiting.insert(language, player.clone()); send(&player, json!({"type":"queued"})); }
                    }
                    Command::Input { seq, value } => {
                        let route = route_rx.borrow().clone();
                        if let Some(route) = route { if route.try_send(RoomEvent::Input(player.id, seq, value)).is_err() { break; } }
                    }
                    Command::Ping => send(&player, json!({"type":"pong"})),
                    Command::Leave => break,
                    _ => break,
                }
            }
        }
    }
    player.alive.store(false, Ordering::Relaxed);
    let route = route_rx.borrow().clone();
    if let Some(route) = route {
        let _ = route.send(RoomEvent::Leave(player.id)).await;
    }
    app.waiting.lock().await.retain(|_, p| p.id != player.id);
}
async fn room(
    players: [Player; 2],
    passage: Passage,
    mut rx: mpsc::Receiver<RoomEvent>,
    db: mpsc::Sender<Value>,
) {
    let id = Uuid::new_v4().to_string();
    let start = Instant::now() + Duration::from_secs(3);
    for (i, p) in players.iter().enumerate() {
        send(
            p,
            json!({"type":"matched", "room":id,"you":i,"text":passage.text,"title":passage.title,"startsIn":3000}),
        );
    }
    let mut games = [
        rules::Game::new(&passage.text),
        rules::Game::new(&passage.text),
    ];
    let mut seqs = [0u64; 2];
    let mut tick = tokio::time::interval(Duration::from_millis(100));
    let mut absent = [None::<Instant>; 2];
    let mut winner: Option<usize> = None;
    let reason;
    loop {
        tokio::select! {
            _ = tick.tick() => {
                let now = Instant::now();
                let elapsed = now.saturating_duration_since(start).as_millis() as u64;
                for i in 0..2 {
                    games[i].tick(elapsed);
                    if !players[i].alive.load(Ordering::Relaxed) { absent[i].get_or_insert(now); }
                }
                if absent.iter().all(Option::is_some) { reason = "abandoned"; break; }
                if let Some(i) = absent.iter().position(|v| v.is_some_and(|t| t.elapsed() >= Duration::from_secs(10))) { winner = Some(1-i); reason = "disconnect"; break; }
                // Operational room lifetime; solo Classic has no timer.
                if elapsed > 900_000 { reason = "timeout"; break; }
                for p in &players { send(p, json!({"type":"state","players":games,"seqs":seqs,"elapsed":elapsed,"startsIn":start.saturating_duration_since(now).as_millis()})); }
            }
            Some(event) = rx.recv() => {
                match event {
                    RoomEvent::Leave(id) => {
                        if let Some(i) = players.iter().position(|p| p.id == id) { absent[i] = Some(Instant::now()); }
                    }
                    RoomEvent::Input(id, seq, value) => {
                        if Instant::now() < start { continue; }
                        let Some(i) = players.iter().position(|p| p.id == id) else { continue; };
                        if seq != seqs[i] + 1 { continue; }
                        seqs[i] = seq;
                        games[i].input(&value, start.elapsed().as_millis() as u64);
                        if games[i].completed_chars == games[i].text.len() { winner = Some(i); reason = "complete"; break; }
                    }
                }
            }
        }
    }
    let summary = json!({"type":"finished","room":id,"winner":winner,"reason":reason,"players":games,"elapsed":start.elapsed().as_millis()});
    for p in &players {
        send(p, summary.clone());
    }
    let stats: Vec<_> = games.iter().map(|g| json!({"score":g.score,"completed":g.completed_chars,"attempts":g.attempts,"mistakes":g.mistakes})).collect();
    let record = json!({"rules":"classic-v1","room":id,"language":passage.language,"title":passage.title,"winner":winner,"reason":reason,"players":stats,"elapsed":start.elapsed().as_millis()});
    if db.send(record).await.is_err() {
        eprintln!("match result persistence unavailable");
    }
}
fn database(path: String) -> Result<mpsc::Sender<Value>, Box<dyn std::error::Error>> {
    let conn = rusqlite::Connection::open(path)?;
    conn.execute_batch("PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL; CREATE TABLE IF NOT EXISTS matches(id TEXT PRIMARY KEY, created INTEGER NOT NULL DEFAULT(unixepoch()), summary TEXT NOT NULL); DELETE FROM matches WHERE created < unixepoch()-604800;")?;
    conn.busy_timeout(Duration::from_secs(3))?;
    let (tx, mut rx) = mpsc::channel::<Value>(1024);
    std::thread::spawn(move || {
        while let Some(v) = rx.blocking_recv() {
            let result = conn.execute(
                "INSERT INTO matches(id,summary) VALUES(?1,?2)",
                rusqlite::params![v["room"].as_str(), v.to_string()],
            );
            if let Err(e) = result {
                eprintln!("match persistence: {e}");
            }
            let _ = conn.execute("DELETE FROM matches WHERE created < unixepoch()-604800", []);
        }
    });
    Ok(tx)
}
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let db = database(std::env::var("TYPEODD_DB").unwrap_or_else(|_| "typeodd.sqlite3".into()))?;
    let origins = std::env::var("TYPEODD_ORIGINS")
        .unwrap_or_else(|_| "http://127.0.0.1:4173,http://localhost:4173".into())
        .split(',')
        .map(str::to_string)
        .collect();
    let app = App {
        waiting: Default::default(),
        slots: Arc::new(Semaphore::new(256)),
        origins: Arc::new(origins),
        db,
        passages: Arc::new(serde_json::from_str(include_str!("../passages.json"))?),
    };
    let routes = Router::new()
        .route(
            "/health",
            get(|| async { axum::Json(json!({"ok":true,"rules":"classic-v1"})) }),
        )
        .route("/v1/ws", get(upgrade))
        .with_state(app);
    let addr = std::env::var("TYPEODD_BIND").unwrap_or_else(|_| "127.0.0.1:8787".into());
    let listener = tokio::net::TcpListener::bind(&addr).await?;
    println!("Typeodd Classic listening on {addr}");
    axum::serve(listener, routes)
        .with_graceful_shutdown(async {
            let _ = tokio::signal::ctrl_c().await;
        })
        .await?;
    Ok(())
}
