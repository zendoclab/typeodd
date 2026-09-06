import type { Settings } from './engine';

export type Result = Settings & {
  rules: 'classic-v1' | 'classic-v2';
  id: string;
  date: string;
  score: number;
  speed: number;
  accuracy: number;
  title: string;
  elapsed: number;
};
const key = 'typeodd.results.classic.v1';
export function readResults(): Result[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');
    if (!Array.isArray(value)) return [];
    return value
      .filter(
        (r): r is Result =>
          r &&
          typeof r.id === 'string' &&
          typeof r.date === 'string' &&
          ['classic-v1', 'classic-v2'].includes(r.rules) &&
          typeof r.title === 'string' &&
          ['en', 'ko'].includes(r.language) &&
          [r.score, r.speed, r.accuracy, r.elapsed].every(
            (n) => typeof n === 'number' && Number.isFinite(n) && n >= 0
          ) &&
          r.accuracy <= 100
      )
      .slice(0, 50);
  } catch {
    return [];
  }
}
export function saveResults(results: Result[]) {
  try {
    localStorage.setItem(key, JSON.stringify(results.slice(0, 50)));
    return true;
  } catch {
    return false;
  }
}
export function clearResults() {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
