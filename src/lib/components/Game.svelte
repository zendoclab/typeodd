<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { catalogs, isLocale } from '$lib/i18n';
  import { site } from '$lib/content';
  import { PUBLIC_MATCH_URL } from '$env/static/public';
  import { matchCopy } from '$lib/i18n/match';
  import {
    Game,
    defaults,
    accuracy,
    speed,
    chars,
    maskWidth,
    type Settings,
    type GameState
  } from '$lib/game/engine';
  import { readResults, saveResults, clearResults, type Result } from '$lib/game/storage';

  const locale = $derived(isLocale(page.params.lang) ? page.params.lang : 'en');
  const copy = $derived(catalogs[locale]);
  const duelCopy = $derived(matchCopy[locale]);
  let mode = $state<'solo' | 'duel'>('solo');
  let matchStatus = $state<
    'idle' | 'connecting' | 'queued' | 'countdown' | 'playing' | 'finished' | 'error'
  >('idle');
  let socket: WebSocket | undefined;
  let startsIn = $state(0);
  let opponent = $state(0);
  let matchOutcome = $state('');
  let seat = 0;
  let sequence = 0;
  let matchText = '';
  let connectionTimer: ReturnType<typeof setTimeout> | undefined;
  const matchBusy = $derived(
    ['connecting', 'queued', 'countdown', 'playing'].includes(matchStatus)
  );
  let settings = $state<Settings>({ ...defaults });
  let snapshot = $state<GameState>(new Game().state);
  let game: Game;
  let input = $state<HTMLTextAreaElement>();
  let draft = $state('');
  let composing = false;
  let lastComposition = { value: '', until: 0 };
  let sounds = $state(false);
  let ready = $state(false);
  let results = $state<Result[]>([]);
  let result = $state<Result | null>(null);
  let notice = $state('');
  let showDelete = $state(false);
  let audio: AudioContext | undefined;
  let seed = 0;
  const progress = $derived(Math.round((snapshot.completedChars / snapshot.total) * 100));

  function sync() {
    snapshot = { ...game.state };
    if (mode === 'solo' && snapshot.status === 'finished' && !result) {
      result = {
        rules: 'classic-v1',
        ...settings,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        title: snapshot.title,
        score: snapshot.score,
        speed: speed(snapshot, settings.language),
        accuracy: accuracy(snapshot),
        elapsed: snapshot.elapsed
      };
      results = [result, ...results].slice(0, 50);
      if (!saveResults(results)) notice = copy.saveFailed;
      input?.blur();
    }
  }
  function reset(next = false, focus = true) {
    if (!ready) return;
    if (next) seed++;
    game = new Game(settings, seed, performance.now());
    result = null;
    draft = '';
    composing = false;
    lastComposition = { value: '', until: 0 };
    notice = '';
    sync();
    if (input) input.value = '';
    if (focus) requestAnimationFrame(() => input?.focus({ preventScroll: true }));
  }
  function tone(correct: boolean) {
    if (!sounds) return;
    try {
      audio ??= new AudioContext();
      if (audio.state === 'suspended') void audio.resume().catch(() => {});
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.frequency.value = correct ? 440 : 150;
      gain.gain.setValueAtTime(0.025, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.06);
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.start();
      oscillator.stop(audio.currentTime + 0.07);
    } catch {
      sounds = false;
    }
  }
  function commit(value: string) {
    if (!game) return;
    if (mode === 'duel' && matchStatus !== 'playing') return;
    if (chars(value).length > 1) {
      notice = copy.typeDirectly;
    } else {
      if (mode === 'duel' && (value || game.state.typed)) {
        if (socket?.readyState !== WebSocket.OPEN) return;
        socket.send(JSON.stringify({ type: 'input', seq: ++sequence, value }));
      }
      game.input(value, performance.now());
      sync();
      if (value) tone(snapshot.correct === true);
    }
    draft = game.state.typed;
    if (input) input.value = draft;
  }
  function handleInput(event: Event) {
    const e = event as InputEvent;
    const value = (e.target as HTMLTextAreaElement).value;
    draft = value;
    if (composing || e.isComposing) return;
    if (
      value === lastComposition.value &&
      performance.now() < lastComposition.until &&
      (!e.inputType || e.inputType.includes('Composition'))
    ) {
      draft = game.state.typed;
      if (input) input.value = draft;
      return;
    }
    commit(value);
  }
  async function share() {
    if (!result) return;
    const text = `Typeodd Classic · ${result.title}\n${result.score} ${copy.points} · ${result.speed} ${result.language === 'en' ? 'WPM' : 'CPM'} · ${copy.accuracy} ${result.accuracy}%\n${site.url}/${locale}/`;
    try {
      await navigator.clipboard.writeText(text);
      notice = copy.copied;
    } catch {
      notice = text;
    }
  }
  function toggleSound() {
    sounds = !sounds;
    try {
      localStorage.setItem('typeodd.sound', String(sounds));
    } catch {
      /* Optional. */
    }
  }
  function closeMatch() {
    clearTimeout(connectionTimer);
    if (socket) {
      socket.onclose = null;
      socket.onerror = null;
      socket.onmessage = null;
      socket.close();
      socket = undefined;
    }
  }
  function leaveMatch() {
    closeMatch();
    matchStatus = 'idle';
    matchOutcome = '';
    opponent = 0;
    reset();
  }
  function chooseMode(next: 'solo' | 'duel') {
    if (matchBusy || (mode === 'solo' && snapshot.status === 'running')) return;
    leaveMatch();
    mode = next;
  }
  function joinMatch() {
    closeMatch();
    const url = PUBLIC_MATCH_URL;
    if (!url) {
      matchStatus = 'error';
      return;
    }
    matchStatus = 'connecting';
    matchOutcome = '';
    result = null;
    sequence = 0;
    opponent = 0;
    try {
      socket = new WebSocket(url);
    } catch {
      matchStatus = 'error';
      return;
    }
    const ws = socket;
    connectionTimer = setTimeout(() => {
      if (matchStatus === 'connecting') {
        closeMatch();
        matchStatus = 'error';
      }
    }, 12000);
    ws.onopen = () => {
      clearTimeout(connectionTimer);
      ws.send(JSON.stringify({ type: 'queue', language: settings.language }));
    };
    ws.onerror = () => {
      matchStatus = 'error';
    };
    ws.onclose = () => {
      if (matchStatus !== 'finished') {
        matchStatus = 'error';
        notice = duelCopy.disconnected;
      }
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'queued') matchStatus = 'queued';
      if (message.type === 'matched') {
        seat = message.you;
        matchText = message.text;
        game = new Game(settings, 0, performance.now() + message.startsIn, {
          title: message.title,
          text: message.text
        });
        draft = '';
        if (input) input.value = '';
        startsIn = Math.ceil(message.startsIn / 1000);
        matchStatus = 'countdown';
        sync();
      }
      if (message.type === 'state' || message.type === 'finished') {
        const own = message.players[seat];
        opponent = Math.round(
          (message.players[1 - seat].completedChars / chars(matchText).length) * 100
        );
        if (message.type === 'finished' || message.seqs[seat] === sequence) {
          Object.assign(game.state, own, {
            target: chars(matchText).slice(own.completedChars).join(''),
            elapsed: message.elapsed / 1000
          });
          if (!composing) {
            draft = own.typed;
            if (input) input.value = draft;
          }
          sync();
        }
        if (message.type === 'state') {
          startsIn = Math.ceil(message.startsIn / 1000);
          if (message.startsIn === 0 && matchStatus === 'countdown') {
            matchStatus = 'playing';
            requestAnimationFrame(() => input?.focus({ preventScroll: true }));
          }
        } else {
          matchStatus = 'finished';
          matchOutcome =
            message.winner === null
              ? duelCopy.draw
              : message.winner === seat
                ? duelCopy.win
                : duelCopy.lose;
          if (message.reason === 'disconnect') matchOutcome += ` ${duelCopy.abandoned}`;
          game.state.status = 'finished';
          sync();
          closeMatch();
        }
      }
    };
  }
  onMount(() => {
    ready = true;
    seed = crypto.getRandomValues(new Uint32Array(1))[0];
    results = readResults();
    try {
      sounds = localStorage.getItem('typeodd.sound') === 'true';
    } catch {
      /* Optional. */
    }
    reset(false, false);
    const timer = window.setInterval(() => {
      game.tick(performance.now());
      sync();
    }, 50);
    // The challenge keeps decaying when focus is lost; hiding the tab cannot freeze a high score.
    return () => {
      clearInterval(timer);
      closeMatch();
      void audio?.close();
    };
  });
</script>

<section id="play" class="play-section wrap" aria-labelledby="play-title">
  <div class="mode-tabs" aria-label="Typeodd">
    <button
      class:selected={mode === 'solo'}
      disabled={matchBusy || (mode === 'solo' && snapshot.status === 'running')}
      onclick={() => chooseMode('solo')}>{duelCopy.solo}</button
    ><button
      class:selected={mode === 'duel'}
      disabled={matchBusy || (mode === 'solo' && snapshot.status === 'running')}
      onclick={() => chooseMode('duel')}>{duelCopy.duel}</button
    >
  </div>
  <div class="section-heading">
    <div>
      <span class="eyebrow">01 / TYPEODD CLASSIC</span>
      <h2 id="play-title">{copy.playground}</h2>
    </div>
    <span class="section-aside">{copy.noSignup}</span>
  </div>
  <div class="game-panel classic-panel">
    <div class="game-toolbar">
      <div class="classic-badge">CLASSIC <span>{snapshot.title}</span></div>
      <div class="game-options">
        <label class="sr-only" for="language">{copy.typingLanguage}</label>
        <select
          id="language"
          value={settings.language}
          disabled={matchBusy || snapshot.status === 'running'}
          onchange={(e) => {
            settings = { language: e.currentTarget.value as Settings['language'] };
            reset();
          }}><option value="en">English</option><option value="ko">한국어</option></select
        >
        <button
          class="sound-button"
          aria-pressed={sounds}
          aria-label={sounds ? copy.soundOff : copy.soundOn}
          onclick={toggleSound}>♪ {sounds ? 'ON' : 'OFF'}</button
        >
      </div>
    </div>
    {#if mode === 'duel' && ['idle', 'connecting', 'queued', 'error', 'finished'].includes(matchStatus)}
      <div class="match-lobby" aria-live="polite">
        <h2>
          {matchStatus === 'finished'
            ? matchOutcome
            : matchStatus === 'queued'
              ? duelCopy.waiting
              : matchStatus === 'connecting'
                ? duelCopy.connecting
                : matchStatus === 'error'
                  ? duelCopy.unavailable
                  : duelCopy.duel}
        </h2>
        <p>{duelCopy.rule}</p>
        {#if matchStatus === 'queued' || matchStatus === 'connecting'}<button
            class="button button-outline"
            onclick={leaveMatch}>{duelCopy.cancel}</button
          >{:else}<button class="button button-lime" onclick={joinMatch}>{duelCopy.find} ↗</button
          >{/if}
      </div>
    {:else}
      {#if mode === 'duel'}<div class="race-track">
          <label>{duelCopy.you} {progress}%<progress value={progress} max="100"></progress></label
          ><label class="opponent"
            >{duelCopy.opponent} {opponent}%<progress value={opponent} max="100"></progress></label
          >
        </div>{/if}
      <div class="game-metrics" aria-label={copy.metrics}>
        <div class="metric timer">
          <span>{copy.progress}</span><strong>{progress}<small>%</small></strong>
        </div>
        <div class="metric">
          <span>{copy.rhythm}</span><strong
            >{Math.round(snapshot.instantaneousCpm)}<small>cpm</small></strong
          >
        </div>
        <div class="metric">
          <span>{copy.accuracy}</span><strong>{accuracy(snapshot)}<small>%</small></strong>
        </div>
        <div class="metric score">
          <span>{copy.score}</span><strong
            >{snapshot.score.toLocaleString(locale)}<small>{copy.points}</small></strong
          >
        </div>
      </div>
      {#if result}
        <div class="result-view" aria-live="polite">
          <span class="eyebrow">{copy.sessionDone}</span>
          <h3>{copy.finished}</h3>
          <p>
            {result.title} · {Math.round(result.elapsed)}s · {result.speed}
            {result.language === 'en' ? 'WPM' : 'CPM'}
          </p>
          <div class="result-actions">
            <button class="button button-lime" onclick={() => reset(false)}>{copy.again} ↻</button
            ><button class="button button-outline" onclick={share}>{copy.copy} ↗</button>
          </div>
        </div>
      {:else}
        <div class="typing-area">
          <div class="typing-caption">
            <span
              ><i class="live-dot"></i>{matchStatus === 'countdown'
                ? `${duelCopy.countdown} ${startsIn}`
                : copy.readAhead}</span
            ><span>{snapshot.delta > 0 ? '+' : ''}{snapshot.delta} {copy.points}</span>
          </div>
          <div class="classic-stage" class:has-error={snapshot.correct === false}>
            <div class="passage" aria-hidden="true" lang={settings.language}>{snapshot.target}</div>
            <div
              class="white-veil"
              data-alpha={snapshot.veil}
              style:opacity={snapshot.veil / 255}
              aria-hidden="true"
            ></div>
            <div class="marking-layer" aria-hidden="true">
              <span class="draft">{draft}</span><span
                class="occlusion-mask"
                data-width={snapshot.width}
                style:width={`${maskWidth(snapshot.width)}px`}
                style:background={snapshot.width > 39
                  ? 'rgba(100,100,100,.960784)'
                  : 'rgba(180,180,180,.960784)'}
              ></span>
            </div>
            <label class="sr-only" for="typing-input">{copy.inputLabel} {snapshot.target}</label>
            <textarea
              bind:this={input}
              id="typing-input"
              value={draft}
              oninput={handleInput}
              oncompositionstart={() => {
                composing = true;
              }}
              oncompositionend={(e) => {
                composing = false;
                lastComposition = { value: e.currentTarget.value, until: performance.now() + 100 };
                commit(e.currentTarget.value);
              }}
              onpaste={(e) => {
                e.preventDefault();
                notice = copy.typeDirectly;
              }}
              ondrop={(e) => e.preventDefault()}
              disabled={!ready || (mode === 'duel' && matchStatus !== 'playing')}
              spellcheck="false"
              autocomplete="off"
              autocapitalize="off"
              {...{ autocorrect: 'off' }}
              aria-describedby="input-hint"
              aria-invalid={snapshot.correct === false}></textarea>
          </div>
          <p class="input-invitation">
            {snapshot.status === 'ready'
              ? copy.clickType
              : snapshot.correct === false
                ? copy.errorHint
                : copy.readAhead}
          </p>
        </div>
      {/if}
      <div class="pressure-readout">
        <span>{copy.mask} <b>{Math.round(maskWidth(snapshot.width))} px</b></span><span
          >{copy.veil} <b>{Math.round((snapshot.veil / 255) * 100)}%</b></span
        ><span>{copy.reward} <b>+{Math.ceil(snapshot.width / 10)}</b></span>
      </div>
      <div class="game-bottom">
        <span id="input-hint">{copy.ruleHint}</span>
        <div>
          {#if mode === 'duel'}<button onclick={leaveMatch}>{duelCopy.leave}</button>{:else}<button
              onclick={() => reset(false)}
              disabled={!ready}>{copy.restart} ↻</button
            ><button onclick={() => reset(true)} disabled={!ready}>{copy.next} →</button>{/if}
        </div>
      </div>
    {/if}
  </div>
  <div class="under-game">
    <p>{mode === 'solo' ? `${copy.errorHint} ${copy.noTimer}` : duelCopy.rule}</p>
  </div>
  <p class="notice" role="status">{notice}</p>
  <noscript><p>{copy.noJs}</p></noscript>
  {#if results.length}<div class="history">
      <div class="history-title">
        <h3>{copy.history} <span>{copy.localOnly}</span></h3>
        {#if showDelete}<span
            >{copy.deleteQuestion}
            <button
              onclick={() => {
                if (clearResults()) {
                  results = [];
                  showDelete = false;
                } else notice = copy.deleteFailed;
              }}>{copy.delete}</button
            > <button onclick={() => (showDelete = false)}>{copy.cancel}</button></span
          >{:else}<button onclick={() => (showDelete = true)}>{copy.clearHistory}</button>{/if}
      </div>
      <div class="history-list">
        {#each results.slice(0, 5) as r}<div>
            <span>Classic · {r.title}</span><b>{r.score.toLocaleString(locale)} {copy.points}</b
            ><span>{r.speed} {r.language === 'en' ? 'WPM' : 'CPM'}</span><span>{r.accuracy}%</span>
          </div>{/each}
      </div>
    </div>{/if}
</section>
