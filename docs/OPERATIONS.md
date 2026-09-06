# 운영

## 프런트

Cloudflare Pages 프로젝트 `typeodd`, `https://typeodd.pages.dev/`.
운영 빌드 환경변수: `PUBLIC_MATCH_URL=wss://typeodd-api.cording.ai/v1/ws`.
표준 도메인 메타데이터는 `https://typeodd.cording.ai`를 사용한다.

사용자는 기존 `typeodd.cording.ai` 프록시 변경을 직접 진행하기로 했다. Pages custom domain에 도메인을 등록한 뒤 CNAME을 `typeodd.pages.dev`로 연결한다. GitHub Pages로의 기존 연결을 먼저 지워 사이트를 끊지 않는다.

## Rust / Termux

작업 경로: `~/typeodd/server`.
DB: `~/typeodd/data/typeodd.sqlite3`.
프로세스 감독: Termux runit의 `typeodd-backend`, `typeodd-cloudflared`.
로그: `~/typeodd/logs/`.

```sh
sv status /data/data/com.termux/files/usr/var/service/typeodd-backend
sv status /data/data/com.termux/files/usr/var/service/typeodd-cloudflared
curl http://127.0.0.1:8793/health
```

소스 갱신 후 `cargo test --locked`와 `cargo build --release --locked -j 2`를 실행한다. 실행 중인 바이너리 경로를 직접 덮어쓰지 않도록 빌드 산출물과 서비스 실행 파일을 분리하고 임시 파일을 원자적으로 이름 변경한다. 재시작은 진행 중인 대전을 끊으므로 접속 여부를 확인한 뒤 배포한다.

## Tunnel과 DNS

- 이름: `typeodd-duel`
- ID: `43516a9b-af81-493f-b320-0ea2a991742c`
- 공개 백엔드: `typeodd-api.cording.ai`
- Origin: `http://127.0.0.1:8793`
- DNS: 프록시 켠 CNAME `typeodd-api` → `43516a9b-af81-493f-b320-0ea2a991742c.cfargotunnel.com`
- 토큰: 서버 `~/.cloudflared/typeodd-duel.token`, 권한 0600. 저장소에 복사하지 않는다.

Cloudflare OAuth에는 DNS 변경 권한이 없어 이 레코드는 도메인 관리자가 추가해야 한다. 기존 다른 프로젝트의 Tunnel과 서비스를 수정하지 않는다.

Android가 Termux를 종료하거나 단말/인터넷이 중단되면 대전 서버도 중단된다. runit은 실행 중인 Termux 안에서 프로세스를 재시작하며 기기 재부팅과 Android 강제 종료까지 해결하지 않는다. 상시 운영에는 별도의 배터리 최적화 제외와 부팅 구성이 필요하다.

## 참고 문서

- https://developers.cloudflare.com/pages/get-started/direct-upload/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel-api/
- https://docs.rs/axum/latest/axum/extract/ws/index.html
