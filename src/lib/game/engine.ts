import { passages } from './passages';

export type Language = 'en' | 'ko';
export type Settings = { language: Language };
export const defaults: Settings = { language: 'en' };
export type GameState = {
  status: 'ready' | 'running' | 'finished';
  title: string;
  target: string;
  total: number;
  typed: string;
  width: number;
  veil: number;
  instantaneousCpm: number;
  score: number;
  delta: number;
  elapsed: number;
  attempts: number;
  mistakes: number;
  completedChars: number;
  correct: boolean | null;
};
export const chars = (value: string) => Array.from(value.normalize('NFC'));
export const rulesVersion = 'classic-v2' as const;
export const balance = {
  maxWidth: 80,
  growthDivisor: 250,
  maxGrowthCpm: 900,
  warmupChars: 5,
  rampChars: 10,
  clarityThreshold: 12
} as const;
export const maskWidth = (width: number) =>
  width < 2 ? 1 : Math.min(balance.maxWidth, width) * 1.5;
export const accuracy = (s: GameState) =>
  s.attempts ? Math.round((s.completedChars / s.attempts) * 100) : 100;
export const speed = (s: GameState, language: Language) =>
  s.elapsed > 0
    ? Math.round(((s.completedChars / (language === 'en' ? 5 : 1)) * 60) / s.elapsed)
    : 0;

export class Game {
  state: GameState;
  private lastCorrect: number | null = null;
  private started: number | null = null;
  private nextDecay: number;
  private lastNow: number;
  constructor(
    settings: Settings = defaults,
    seed = 0,
    now = 0,
    passage?: { title: string; text: string }
  ) {
    const pool = passages.filter((p) => p.language === settings.language);
    const selected = passage ?? pool[Math.abs(seed) % pool.length];
    this.state = {
      status: 'ready',
      title: selected.title,
      target: selected.text,
      total: chars(selected.text).length,
      typed: '',
      width: 1,
      veil: 0,
      instantaneousCpm: 0,
      score: 0,
      delta: 0,
      elapsed: 0,
      attempts: 0,
      mistakes: 0,
      completedChars: 0,
      correct: null
    };
    this.lastNow = now;
    this.nextDecay = now + 1000;
  }
  tick(now: number) {
    if (!Number.isFinite(now) || this.state.status === 'finished') return this.state;
    now = Math.max(this.lastNow, now);
    this.lastNow = now;
    // Preserve the original one-second timer phase, including idle time before the first key.
    while (this.nextDecay <= now && this.state.width > 1) {
      this.state.width = Math.ceil(this.state.width - Math.ceil(this.state.width * 0.25));
      this.nextDecay += 1000;
    }
    if (this.nextDecay <= now)
      this.nextDecay += (Math.floor((now - this.nextDecay) / 1000) + 1) * 1000;
    if (this.started !== null) this.state.elapsed = (now - this.started) / 1000;
    return this.state;
  }
  input(value: string, now: number) {
    const s = this.state;
    if (s.status === 'finished' || !Number.isFinite(now)) return s;
    value = value.normalize('NFC');
    // Empty no-op callbacks follow committed IME input in some browsers.
    if (!value && !s.typed) return s;
    this.tick(now);
    now = this.lastNow;
    if (this.started === null) {
      this.started = now;
      s.status = 'running';
    }
    const incoming = chars(value);
    // A single committed character, or deletion of an erroneous draft. No bulk score farming.
    if (incoming.length > 1) return s;
    s.typed = value;
    s.correct = incoming.length === 1 && incoming[0] === chars(s.target)[0];
    if (incoming.length) s.attempts++;
    if (s.correct) {
      // Original timestamps use integer milliseconds. Guard zero intervals, keeping finite growth.
      if (this.lastCorrect !== null)
        s.instantaneousCpm = 60000 / Math.max(1, Math.floor(now) - Math.floor(this.lastCorrect));
      this.lastCorrect = now;
      // Ease into the challenge; batched browser/network input cannot create a giant mask.
      const ramp = Math.min(
        1,
        Math.max(0, (s.completedChars + 1 - balance.warmupChars) / balance.rampChars)
      );
      const growth = Math.min(s.instantaneousCpm, balance.maxGrowthCpm) / balance.growthDivisor;
      s.width = Math.min(balance.maxWidth, s.width + growth * ramp);
      s.target = chars(s.target).slice(1).join('');
      s.typed = '';
      s.completedChars++;
      s.delta = Math.ceil(s.width / 10);
      s.score += s.delta;
    } else {
      s.instantaneousCpm = 0;
      if (incoming.length) s.mistakes++;
      s.delta = -Math.ceil(s.score * 0.3);
      s.score = Math.max(0, s.score + s.delta);
    }
    // Deliberately BEFORE error resets width: this ordering matches source@8959147.
    s.veil =
      Math.trunc(s.width) > balance.clarityThreshold
        ? s.veil > 3
          ? s.veil - 2
          : 0
        : s.veil < 252
          ? s.veil + 3
          : 255;
    if (!s.correct) s.width = 1;
    if (!s.target) s.status = 'finished';
    return s;
  }
}
