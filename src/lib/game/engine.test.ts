import { describe, it, expect } from 'vitest';
import { Game, defaults, maskWidth } from './engine';
import { passages } from './passages';

describe('Classic v2 balanced masking', () => {
  it('eases into masking and retains error, deletion and recovery scoring', () => {
    const g = new Game(defaults, 0, 0, { title: 'trace', text: 'abcdefghijklmnop' });
    // Same trace is checked by the Rust referee. First five letters do not grow the mask.
    const trace = [
      [0, 'a', 1, 3, 1],
      [100, 'b', 1, 6, 2],
      [200, 'c', 1, 9, 3],
      [300, 'd', 1, 12, 4],
      [400, 'e', 1, 15, 5],
      [500, 'f', 1.36, 18, 6],
      [600, 'g', 2.08, 21, 7],
      [700, 'h', 3.16, 24, 8],
      [800, 'X', 1, 27, 5],
      [900, '', 1, 30, 3],
      [1100, 'i', 1.36, 33, 4]
    ] as const;
    for (const [t, value, width, veil, score] of trace) {
      g.input(value, t);
      expect(g.state.width).toBeCloseTo(width);
      expect([g.state.veil, g.state.score]).toEqual([veil, score]);
    }
    expect(g.state.target).toBe('jklmnop');
  });
  it('decays on whole seconds without changing the veil, even while idle', () => {
    const g = new Game();
    g.state.width = 100;
    g.state.veil = 80;
    g.tick(999);
    expect(g.state.width).toBe(100);
    for (const [time, width] of [
      [1000, 75],
      [2000, 56],
      [3000, 42],
      [4000, 31]
    ]) {
      g.tick(time);
      expect(g.state.width).toBe(width);
      expect(g.state.veil).toBe(80);
    }
    g.tick(99999999);
    expect(g.state.width).toBe(1);
    expect(g.state.status).toBe('ready');
  });
  it('keeps fading responsive to the gentler growth and caps bursts at 120 rendered pixels', () => {
    const g = new Game();
    g.state.width = 12.9;
    g.state.veil = 252;
    g.input('X', 0);
    expect(g.state.veil).toBe(255);
    g.state.width = 13;
    g.state.veil = 3;
    g.input('X', 1);
    expect(g.state.veil).toBe(0);
    const burst = new Game(defaults, 0, 0, { title: 'burst', text: 'a'.repeat(100) });
    for (let i = 0; i < 100; i++) {
      const before = burst.state.width;
      burst.input('a', 0);
      expect(burst.state.width - before).toBeLessThanOrEqual(5.4 + 1e-9);
      expect(maskWidth(burst.state.width)).toBeLessThanOrEqual(120);
      if (i < 5) expect(maskWidth(burst.state.width)).toBe(1);
    }
    expect(burst.state.width).toBe(80);
    expect(maskWidth(849)).toBe(120);
  });
  it('recovers clarity at a steady 300 CPM while keeping slow typing challenging', () => {
    for (const [interval, clears] of [
      [200, true],
      [500, false]
    ] as const) {
      const g = new Game(defaults, 0, 0, { title: 'pace', text: 'a'.repeat(121) });
      for (let i = 0; i < 120; i++) g.input('a', i * interval);
      expect(g.state.veil === 0).toBe(clears);
      expect(g.state.width).toBeLessThanOrEqual(80);
    }
  });
  it('ends on passage completion only; retries start from a clean clock', () => {
    const g = new Game(defaults, 0, 0, { title: 'two', text: 'ab' });
    g.input('a', 0);
    g.tick(120000);
    expect(g.state.status).toBe('running');
    g.input('b', 120001);
    expect(g.state.status).toBe('finished');
    const score = g.state.score;
    g.input('x', 120010);
    expect(g.state.score).toBe(score);
    const retry = new Game(defaults, 0, 500000);
    retry.input(retry.state.target[0], 500001);
    expect(retry.state.width).toBe(1);
  });
  it('accepts committed NFC Korean and rejects bulk input without score farming', () => {
    const g = new Game({ language: 'ko' }, 0, 0, { title: 'IME', text: '가나다' });
    g.input('가나', 0);
    expect(g.state.score).toBe(0);
    g.input('가'.normalize('NFD'), 100);
    expect(g.state.target).toBe('나다');
    g.input('', 100);
    expect(g.state.score).toBe(1);
    g.input('나', 100);
    expect(Number.isFinite(g.state.width)).toBe(true);
  });
  it('loads distinct, playable contemporary passages in both languages', () => {
    expect(new Set(passages.map((p) => p.id)).size).toBe(passages.length);
    expect(new Set(passages.map((p) => p.text)).size).toBe(passages.length);
    for (const language of ['en', 'ko']) {
      const pool = passages.filter((p) => p.language === language);
      expect(pool).toHaveLength(30);
      expect(new Set(pool.map((p) => p.topic)).size).toBe(6);
      for (const p of pool) {
        expect(p.text).toBe(p.text.trim().normalize('NFC'));
        expect(p.text).not.toMatch(/[\n\r\t]| {2}/);
        expect([...p.text].length).toBeGreaterThanOrEqual(language === 'en' ? 180 : 100);
        expect([...p.text].length).toBeLessThanOrEqual(language === 'en' ? 320 : 180);
        if (language === 'en') expect(p.text).toMatch(/^[\x20-\x7e]+$/);
      }
    }
  });
});
