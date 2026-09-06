import { describe, it, expect } from 'vitest';
import { detectLocale, locales, catalogs } from './index';
describe('language routing', () => {
  it('uses a saved preference, then browser priority, then English', () => {
    expect(detectLocale(['ko-KR'], 'es')).toBe('es');
    expect(detectLocale(['fr-FR', 'ja-JP', 'ko-KR'])).toBe('ja');
    expect(detectLocale(['zh-TW'])).toBe('zh');
    expect(detectLocale(['ar'])).toBe('en');
  });
  it('has translated documents and original-rule explanations in every locale', () => {
    for (const locale of locales) {
      expect(catalogs[locale].faqs.length).toBeGreaterThanOrEqual(6);
      expect(catalogs[locale].guideSections.length).toBe(4);
      expect(catalogs[locale].faqs[2].a).toContain('30%');
    }
  });
});
