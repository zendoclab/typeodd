import en from './en';
import ko from './ko';
import ja from './ja';
import zh from './zh';
import es from './es';
import { live } from './live';

export const locales = ['en', 'ko', 'ja', 'zh', 'es'] as const;
export type Locale = (typeof locales)[number];
export type Catalog = typeof en;
export const catalogs: Record<Locale, Catalog> = { en, ko, ja, zh, es };
for (const locale of locales) {
  const c = catalogs[locale];
  const l = live[locale];
  c.faqs[5] = { q: l.scoresQ, a: l.scoresA };
  c.faqs.push({ q: l.question, a: l.answer });
  c.privacyTitle = l.privacyTitle;
  c.privacyLead = l.privacyLead;
  c.privacySections[1] = { title: l.serverTitle, body: l.serverBody };
  c.privacySections[3] = { title: l.futureTitle, body: l.futureBody };
  c.aboutSections[2].body = l.aboutBody;
}
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  ja: '日本語',
  zh: '简体中文',
  es: 'Español'
};
export const htmlLanguages: Record<Locale, string> = {
  en: 'en',
  ko: 'ko',
  ja: 'ja',
  zh: 'zh-Hans',
  es: 'es'
};
export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  ko: 'ko_KR',
  ja: 'ja_JP',
  zh: 'zh_CN',
  es: 'es_ES'
};
export const isLocale = (value: string | undefined | null): value is Locale =>
  locales.includes(value as Locale);
export function detectLocale(languages: readonly string[], saved?: string | null): Locale {
  if (isLocale(saved)) return saved;
  for (const language of languages) {
    const code = language.toLowerCase().split(/[-_]/)[0];
    if (isLocale(code)) return code;
  }
  return 'en';
}
export const localePath = (locale: Locale, path = '/') => `/${locale}${path}`;
