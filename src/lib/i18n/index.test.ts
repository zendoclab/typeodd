import { describe, it, expect } from 'vitest';
import { detectLocale, locales, catalogs, stripLocale, direction } from './index';
describe('language routing', () => {
  it('uses a saved preference, then browser priority, then English', () => {
    expect(detectLocale(['ko-KR'], 'es')).toBe('es');
    expect(detectLocale(['fr-FR', 'ja-JP', 'ko-KR'])).toBe('fr');
    expect(detectLocale(['zh-TW'])).toBe('zh');
    expect(detectLocale(['ar-SA'])).toBe('ar');
    expect(detectLocale(['pt-BR'])).toBe('pt');
    expect(detectLocale(['in-ID'])).toBe('id');
    expect(detectLocale(['it-IT', 'UR_pk'], 'invalid')).toBe('ur');
    expect(detectLocale(['it-IT'])).toBe('en');
  });
  it('strips only a supported language segment and handles right-to-left interfaces', () => {
    for (const locale of locales) {
      expect(stripLocale(`/${locale}/how-to-play/`)).toBe('/how-to-play/');
      expect(stripLocale(`/${locale}`)).toBe('/');
      expect(direction(locale)).toBe(['ar', 'ur'].includes(locale) ? 'rtl' : 'ltr');
    }
    expect(stripLocale('/privacy/')).toBe('/privacy/');
    expect(stripLocale('/france/')).toBe('/france/');
  });
  it('has translated documents and original-rule explanations in every locale', () => {
    for (const locale of locales) {
      expect(catalogs[locale].faqs.length).toBeGreaterThanOrEqual(6);
      expect(catalogs[locale].guideSections.length).toBe(4);
      expect(catalogs[locale].faqs[2].a).toContain('30%');
    }
  });
});
