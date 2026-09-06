export const live = {
  en: {
    question: 'How does the 1:1 match work?',
    answer:
      'Choose 1:1 match and find an opponent in the same passage language. Both receive the same passage and a three-second start countdown. Original marking, fading and scoring apply. The first server-confirmed completion wins. Leaving forfeits; a lost connection ends the match after 10 seconds and cannot be resumed. Matches have a 15-minute operational limit.',
    scoresQ: 'Where are results stored?',
    scoresA:
      'Solo results stay in this browser, up to 50 completions. Matches use an anonymous Rust referee: confirmed input determines progress and victory. Match summaries are stored for seven days, with expired records deleted on startup or the next result. No account or public ranking is required.',
    privacyTitle: 'Solo and live data',
    privacyLead: 'What stays in your browser and what a 1:1 match sends.',
    serverTitle: '1:1 match server',
    serverBody:
      'Solo input stays on your device. In a match, committed input is sent over encrypted WSS through Cloudflare Tunnel to a Rust server. Input is processed in memory; only anonymous match ID, passage, language, scores, progress, attempt counts, winner, duration and ending reason are stored in SQLite. No raw input log, name or IP address is stored by the game database. Summaries expire after seven days and are deleted on startup or the next result. Cloudflare receives connection information needed to provide its service.',
    futureTitle: 'Chat',
    futureBody:
      'Chat is not available yet. Message storage and deletion will be documented before it launches.',
    aboutBody:
      'Solo Classic and anonymous 1:1 races are available. A Rust server judges races using the original rules. Chat remains a future idea. Explore the code on GitHub or visit Works of zendoc. The game makes no medical claims.'
  },
  ko: {
    question: '1:1 대전은 어떻게 하나요?',
    answer:
      '1:1 대전에서 상대 찾기를 누르세요. 같은 지문 언어를 고른 상대가 오면 3초 뒤 함께 시작해요. 두 사람은 같은 글을 입력하고, 먼저 끝낸 사람이 이겨요. 중간에 나가면 기권이에요. 연결이 끊기면 10초 뒤 종료되며 같은 판으로 돌아올 수는 없어요. 한 판은 최대 15분이에요.',
    scoresQ: '기록은 어디에 저장되나요?',
    scoresA:
      '혼자 한 기록은 최근 50개까지 지금 쓰는 브라우저에 남아요. 다른 기기로 옮겨지지는 않아요. 대전 결과는 서버에 7일간 보관하고, 서버를 시작하거나 다음 결과를 저장할 때 지난 기록을 지워요. 회원가입은 필요 없고 공개 순위표는 없어요.',
    privacyTitle: '솔로와 대전의 데이터.',
    privacyLead: '브라우저에 남는 정보와 1:1 대전에서 전송하는 정보입니다.',
    serverTitle: '1:1 대전 서버',
    serverBody:
      '솔로 입력은 기기 안에 남습니다. 대전에서는 확정 입력을 암호화된 WSS와 Cloudflare Tunnel을 통해 Rust 서버로 보냅니다. 입력은 메모리에서 처리하며 SQLite에는 익명 대전 ID, 지문, 언어, 점수, 진행률, 시도 횟수, 승자, 소요시간, 종료 사유만 저장합니다. 게임 DB에 원시 입력 로그·이름·IP 주소를 저장하지 않습니다. 요약은 7일 뒤 만료되며 서버 시작 또는 다음 결과 저장 때 삭제합니다. Cloudflare는 서비스 제공에 필요한 연결 정보를 받습니다.',
    futureTitle: '채팅',
    futureBody: '채팅은 아직 제공하지 않습니다. 출시 전에 메시지 보관과 삭제 방침을 안내합니다.',
    aboutBody:
      '솔로 Classic과 익명 1:1 대전을 제공합니다. Rust 서버가 원작 규칙으로 대전을 판정하며 채팅은 향후 구상입니다. GitHub에서 코드를 살펴보고 Works of zendoc에서 다른 작업을 만나 보세요. 의학적 효과는 주장하지 않습니다.'
  },
  ja: {
    question: '1対1対戦の遊び方は？',
    answer:
      '1対1対戦を選ぶと、同じ文章言語の相手を探します。同じ文章と3秒の開始カウントダウンが届きます。原作のマーク・薄さ・得点を使い、サーバーが先に完走を確認した人が勝ちます。退出は棄権。切断は10秒後に終了し、再接続できません。対戦は最大15分です。',
    scoresQ: '記録はどこに保存される？',
    scoresA:
      'ソロのクリア記録50件はこのブラウザーに保存します。対戦は匿名のRustサーバーが入力と勝敗を判定します。対戦の要約は7日で期限切れとなり、起動時か次の結果保存時に削除します。登録や公開順位表はありません。',
    privacyTitle: 'ソロと対戦のデータ。',
    privacyLead: 'ブラウザーに残る情報と対戦で送る情報。',
    serverTitle: '1対1対戦サーバー',
    serverBody:
      'ソロの入力は端末内に残ります。対戦では確定入力を暗号化WSSとCloudflare Tunnel経由でRustサーバーへ送ります。入力はメモリーで処理し、SQLiteには匿名対戦ID、文章、言語、得点、進行度、試行数、勝者、時間、終了理由だけ保存します。生の入力ログ、名前、IPアドレスはゲームDBに保存しません。要約は7日で期限切れとなり、起動時か次の結果保存時に削除します。Cloudflareは配信に必要な接続情報を受け取ります。',
    futureTitle: 'チャット',
    futureBody: 'チャットはまだ提供していません。公開前にメッセージ保存・削除について説明します。',
    aboutBody:
      'ソロClassicと匿名1対1対戦を提供します。Rustサーバーが原作ルールで判定します。チャットは今後の構想です。GitHubやWorks of zendocもご覧ください。医学的効果は主張しません。'
  },
  zh: {
    question: '如何进行1对1对战？',
    answer:
      '选择1对1对战，寻找使用相同段落语言的对手。双方获得相同段落和3秒开始倒计时。沿用原作标记、淡化和计分规则，服务器先确认完成的一方获胜。退出视为弃权，断线10秒后结束且无法重新加入。每场最长15分钟。',
    scoresQ: '记录保存在哪里？',
    scoresA:
      '单人完成记录最多50条，只保存在此浏览器。对战由匿名Rust服务器根据输入判定进度和胜负。对战摘要保留7天，在启动或保存下一条结果时清除过期记录。无需账号，没有公开排行榜。',
    privacyTitle: '单人与对战的数据。',
    privacyLead: '留在浏览器的信息与对战发送的信息。',
    serverTitle: '1对1对战服务器',
    serverBody:
      '单人输入留在设备内。对战通过加密WSS和Cloudflare Tunnel将确认输入发送至Rust服务器。输入在内存中处理，SQLite只保存匿名对战ID、段落、语言、分数、进度、尝试次数、胜者、耗时和结束原因。不在游戏数据库保存原始输入日志、姓名或IP地址。摘要7天后过期，在启动或保存下一条结果时删除。Cloudflare接收提供服务所需的连接信息。',
    futureTitle: '聊天',
    futureBody: '暂未提供聊天，上线前将说明消息保留与删除方式。',
    aboutBody:
      '目前提供单人Classic和匿名1对1对战，由Rust服务器依据原作规则判定。聊天仍是后续设想。代码见GitHub，其他作品见Works of zendoc。不声称医学效果。'
  },
  es: {
    question: '¿Cómo funciona el duelo 1:1?',
    answer:
      'Elige Duelo 1:1 para buscar un rival con el mismo idioma de pasaje. Ambos reciben el mismo texto y una cuenta atrás de tres segundos. Se aplican la marca, el velo y los puntos originales. Gana la primera finalización confirmada por el servidor. Salir es abandonar; una desconexión termina el duelo tras 10 segundos y no permite volver. Máximo 15 minutos por duelo.',
    scoresQ: '¿Dónde se guardan los resultados?',
    scoresA:
      'Hasta 50 resultados individuales quedan en este navegador. En los duelos, un servidor Rust anónimo valida entradas y decide progreso y victoria. Los resúmenes caducan a los siete días y se borran al iniciar el servidor o guardar el siguiente resultado. No se requiere cuenta y no hay clasificación pública.',
    privacyTitle: 'Datos individuales y de duelos.',
    privacyLead: 'Qué queda en tu navegador y qué se envía al jugar 1:1.',
    serverTitle: 'Servidor de duelos 1:1',
    serverBody:
      'La entrada individual queda en tu dispositivo. Los duelos envían caracteres confirmados por WSS cifrado y Cloudflare Tunnel a un servidor Rust. Se procesan en memoria; SQLite solo guarda ID anónimo, pasaje, idioma, puntos, progreso, intentos, ganador, duración y motivo de fin. La base de datos no guarda el registro de entrada, nombres ni direcciones IP. Los resúmenes caducan a los siete días y se borran al iniciar o guardar el siguiente resultado. Cloudflare recibe datos de conexión necesarios para prestar el servicio.',
    futureTitle: 'Chat',
    futureBody:
      'El chat aún no está disponible. Su conservación y eliminación se explicarán antes del lanzamiento.',
    aboutBody:
      'Hay Classic individual y duelos anónimos 1:1. Un servidor Rust aplica las reglas originales. El chat es una idea futura. Explora GitHub y Works of zendoc. El juego no afirma beneficios médicos.'
  }
};
