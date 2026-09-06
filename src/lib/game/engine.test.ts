import { describe, it, expect } from 'vitest';
import { Game, defaults, maskWidth } from './engine';
import { passages } from './passages';

describe('Classic parity with source@8959147', () => {
  it('matches the original fast-input, high-width error, deletion and recovery trace', () => {
    const g = new Game(defaults, 0, 0, { title: 'trace', text: 'abcdefghijklmnop' });
    // Golden values manually evaluated from original main.dart:172, 214, 677–754.
    const trace = [
      [0, 'a', 1, 3, 1],
      [100, 'b', 7, 6, 2],
      [200, 'c', 13, 9, 4],
      [300, 'd', 19, 12, 6],
      [400, 'e', 25, 15, 9],
      [500, 'f', 31, 18, 13],
      [600, 'g', 37, 21, 17],
      [700, 'h', 43, 19, 22],
      [800, 'X', 1, 17, 15],
      [900, '', 1, 20, 10],
      [1100, 'i', 2.5, 23, 11]
    ] as const;
    for (const [t, value, width, veil, score] of trace) {
      g.input(value, t);
      expect([g.state.width, g.state.veil, g.state.score]).toEqual([width, veil, score]);
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
  it('preserves the integer threshold, veil end cases and growth gate overshoot', () => {
    const g = new Game();
    g.state.width = 39.9;
    g.state.veil = 252;
    g.input('X', 0);
    expect(g.state.veil).toBe(255);
    g.state.width = 40;
    g.state.veil = 3;
    g.input('X', 1);
    expect(g.state.veil).toBe(0);
    g.input('', 2);
    g.input(g.state.target[0], 3);
    g.state.width = 249;
    g.input(g.state.target[0], 4);
    expect(g.state.width).toBe(849);
    expect(maskWidth(g.state.width)).toBe(1273.5);
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
