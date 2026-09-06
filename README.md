# Typeodd Classic

느리면 희미해지고, 빠르면 마킹이 다음 글자를 가리는 타이핑 마인드게임. 원작 Flutter의 핵심 규칙을 SvelteKit으로 옮겼다. 화면은 게임 중심이며 솔로와 익명 1:1 자동 매칭을 제공한다.

현재 `classic-v2`는 초기 5글자 가림을 최소화하고 성장량을 원작의 60%로 조정했다. 최근 조정으로 직전 버전보다 성장량을 50% 높였다. 가림막 표시 길이는 최대 120px이며 브라우저와 Rust 서버가 같은 규칙을 사용한다. 원본 대비 변경 수치는 [검토 문서](docs/PROJECT_REVIEW.md)에 기록한다.

- 프런트: SvelteKit 2 / Svelte 5 / TypeScript / static adapter
- 대전: Rust / Tokio / Axum WebSocket / SQLite WAL / Cloudflare Tunnel
- 표시 언어: NOWQ와 같은 14개 언어(en·ko·zh·es·hi·ar·fr·pt·bn·ru·ja·de·id·ur), 브라우저 자동 선택·수동 선택 기억·아랍어와 우르두어 RTL 지원
- 지문: 현대적인 소재의 창작 지문 60개(한글 30개·영문 30개), 6개 주제
- Works of zendoc: https://me.zendoc.uk/

## 로컬 실행

Node 22+, Rust stable, C/C++ 빌드 도구가 필요하다(SQLite bundled).

```sh
npm ci
cp .env.example .env
cargo run --manifest-path server/Cargo.toml
npm run dev
```

개발 서버에서 대전하려면 Rust의 `TYPEODD_ORIGINS`에 해당 Origin을 지정한다. 예: `http://127.0.0.1:5173`. 기본 Rust 포트는 8787이며 공개 운영 서버는 loopback 8793을 사용한다.

```sh
npm run check
npm test
cargo test --manifest-path server/Cargo.toml --locked
npm run build
npm run test:e2e
```

E2E는 4173 프런트 미리보기와 8787 Rust 서버를 시작한다. 테스트용 빌드는 `PUBLIC_MATCH_URL=ws://127.0.0.1:8787/v1/ws`를 사용한다. 운영 빌드는 `wss://typeodd-api.cording.ai/v1/ws`를 사용한다.

## 배포

Cloudflare Pages 프로젝트는 `typeodd`, 공개 주소는 `https://typeodd.pages.dev/`다. 빌드 폴더만 업로드한다.

```sh
npx wrangler pages deploy build --project-name typeodd --branch main
```

`typeodd.cording.ai`는 사용자 요청대로 기존 프록시 변경을 사용자가 진행한다. 사용자 도메인은 Pages에도 연결해야 한다. 상세 운영과 DNS는 [운영 문서](docs/OPERATIONS.md)를 참고한다. SSH 암호, Tunnel 토큰, DB 파일은 저장소에 넣지 않는다.

## 규칙과 원본

지문은 `content/passages.json`에서 관리하며 솔로와 Rust 대전 서버가 같은 파일을 사용한다. [지문 작성 기준](docs/CONTENT.md)에 따라 작성했다. 원작 지문은 Git 이력과 원작 브랜치에서 확인할 수 있다.

원작 기준은 `source@8959147`의 `lib/main.dart`, 배포 산출물은 `main@b858c44`의 `main.dart.js`다. 원작 브랜치는 유지한다. 규칙, 의도와 기술적 보완의 구분은 [검토 문서](docs/PROJECT_REVIEW.md), 디자인은 [DESIGN.md](DESIGN.md), 대전 구조는 [멀티플레이 문서](docs/MULTIPLAYER_PLAN.md)에 있다.

솔로 기록은 브라우저에만 저장한다. 대전 요약은 익명으로 SQLite에 저장한다. 실제 배포된 개인정보 안내는 각 언어의 `/privacy/` 페이지를 참고한다. 채팅은 아직 구현하지 않았다.
