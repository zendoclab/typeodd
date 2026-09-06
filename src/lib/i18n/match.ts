import type { Locale } from './index';
export const matchCopy: Record<
  Locale,
  {
    solo: string;
    duel: string;
    find: string;
    waiting: string;
    connecting: string;
    cancel: string;
    you: string;
    opponent: string;
    win: string;
    lose: string;
    draw: string;
    unavailable: string;
    disconnected: string;
    rule: string;
    leave: string;
    countdown: string;
    abandoned: string;
  }
> = {
  en: {
    solo: 'Solo',
    duel: '1:1 match',
    find: 'Find an opponent',
    waiting: 'Finding an opponent…',
    connecting: 'Connecting…',
    cancel: 'Cancel',
    you: 'You',
    opponent: 'Opponent',
    win: 'You win.',
    lose: 'Opponent wins.',
    draw: 'Match ended.',
    unavailable: 'Cannot connect. Try again shortly.',
    disconnected: 'Connection lost. This match cannot be resumed.',
    rule: 'Same passage. Original rules. First to finish wins. Leaving forfeits the match. Maximum 15 minutes.',
    leave: 'Leave match',
    countdown: 'Starting in',
    abandoned: 'Opponent disconnected.'
  },
  ko: {
    solo: '솔로',
    duel: '1:1 대전',
    find: '상대 찾기',
    waiting: '상대를 찾고 있습니다…',
    connecting: '연결 중…',
    cancel: '취소',
    you: '나',
    opponent: '상대',
    win: '승리했습니다.',
    lose: '상대가 먼저 완주했습니다.',
    draw: '대전이 종료되었습니다.',
    unavailable: '연결하지 못했습니다. 잠시 후 다시 시도해 주세요.',
    disconnected: '연결이 끊겼습니다. 이 대전에는 재접속할 수 없습니다.',
    rule: '같은 지문, 원작 규칙. 먼저 완주하면 승리합니다. 중도 퇴장은 기권이며 대전은 최대 15분입니다.',
    leave: '대전 나가기',
    countdown: '시작까지',
    abandoned: '상대의 연결이 끊겼습니다.'
  },
  ja: {
    solo: 'ソロ',
    duel: '1対1対戦',
    find: '相手を探す',
    waiting: '対戦相手を探しています…',
    connecting: '接続中…',
    cancel: 'キャンセル',
    you: 'あなた',
    opponent: '相手',
    win: 'あなたの勝利です。',
    lose: '相手の勝利です。',
    draw: '対戦終了。',
    unavailable: '接続できません。後でもう一度お試しください。',
    disconnected: '切断されました。この対戦には再接続できません。',
    rule: '同じ文章、原作のルール。先に完走した方が勝利。退出は棄権です。対戦は最大15分。',
    leave: '対戦を退出',
    countdown: '開始まで',
    abandoned: '相手が切断されました。'
  },
  zh: {
    solo: '单人',
    duel: '1对1对战',
    find: '寻找对手',
    waiting: '正在寻找对手…',
    connecting: '连接中…',
    cancel: '取消',
    you: '你',
    opponent: '对手',
    win: '你赢了。',
    lose: '对手赢了。',
    draw: '对战结束。',
    unavailable: '无法连接，请稍后再试。',
    disconnected: '连接中断，无法重新加入本场对战。',
    rule: '相同段落，原作规则。先完成者获胜。退出视为弃权。每场最长15分钟。',
    leave: '退出对战',
    countdown: '开始倒计时',
    abandoned: '对手已断开连接。'
  },
  es: {
    solo: 'Solo',
    duel: 'Duelo 1:1',
    find: 'Buscar rival',
    waiting: 'Buscando rival…',
    connecting: 'Conectando…',
    cancel: 'Cancelar',
    you: 'Tú',
    opponent: 'Rival',
    win: 'Has ganado.',
    lose: 'Gana tu rival.',
    draw: 'Duelo terminado.',
    unavailable: 'No se pudo conectar. Inténtalo de nuevo.',
    disconnected: 'Conexión perdida. No puedes reanudar este duelo.',
    rule: 'Mismo pasaje y reglas originales. Gana quien termine primero. Salir cuenta como abandono. Máximo 15 minutos.',
    leave: 'Salir del duelo',
    countdown: 'Empieza en',
    abandoned: 'El rival se ha desconectado.'
  }
};
