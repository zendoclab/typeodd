import en from './en';
import ko from './ko';
import ja from './ja';
import zh from './zh';
import es from './es';
import { live } from './live';
import hi from './hi';
import ar from './ar';
import fr from './fr';
import pt from './pt';
import bn from './bn';
import ru from './ru';
import de from './de';
import id from './id';
import ur from './ur';
import type { Catalog } from './catalog';
export type { Catalog } from './catalog';

export const locales = [
  'en',
  'ko',
  'zh',
  'es',
  'hi',
  'ar',
  'fr',
  'pt',
  'bn',
  'ru',
  'ja',
  'de',
  'id',
  'ur'
] as const;
export type Locale = (typeof locales)[number];
export const catalogs: Record<Locale, Catalog> = {
  en,
  ko,
  ja,
  zh,
  es,
  hi,
  ar,
  fr,
  pt,
  bn,
  ru,
  de,
  id,
  ur
};
for (const locale of Object.keys(live) as (keyof typeof live)[]) {
  const c = catalogs[locale];
  const l = live[locale];
  c.faqs[5] = { q: l.scoresQ, a: l.scoresA };
  c.faqs.push({ q: l.question, a: l.answer });
  c.privacyTitle = l.privacyTitle;
  c.privacyLead = l.privacyLead;
  c.privacySections[1] = { title: l.serverTitle, body: l.serverBody };
  c.privacySections[3] = { title: l.futureTitle, body: l.futureBody };
}
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  ja: '日本語',
  zh: '简体中文',
  es: 'Español',
  hi: 'हिन्दी',
  ar: 'العربية',
  fr: 'Français',
  pt: 'Português',
  bn: 'বাংলা',
  ru: 'Русский',
  de: 'Deutsch',
  id: 'Bahasa Indonesia',
  ur: 'اردو'
};
export const htmlLanguages: Record<Locale, string> = {
  en: 'en',
  ko: 'ko',
  ja: 'ja',
  zh: 'zh-Hans',
  es: 'es',
  hi: 'hi',
  ar: 'ar',
  fr: 'fr',
  pt: 'pt',
  bn: 'bn',
  ru: 'ru',
  de: 'de',
  id: 'id',
  ur: 'ur'
};
export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  ko: 'ko_KR',
  ja: 'ja_JP',
  zh: 'zh_CN',
  es: 'es_ES',
  hi: 'hi_IN',
  ar: 'ar_AR',
  fr: 'fr_FR',
  pt: 'pt_BR',
  bn: 'bn_BD',
  ru: 'ru_RU',
  de: 'de_DE',
  id: 'id_ID',
  ur: 'ur_PK'
};
export const direction = (locale: Locale): 'rtl' | 'ltr' =>
  locale === 'ar' || locale === 'ur' ? 'rtl' : 'ltr';
export function stripLocale(path: string): string {
  const first = path.split('/')[1];
  return isLocale(first) ? path.slice(first.length + 1) || '/' : path;
}
export const isLocale = (value: string | undefined | null): value is Locale =>
  locales.includes(value as Locale);
export function detectLocale(languages: readonly string[], saved?: string | null): Locale {
  if (isLocale(saved)) return saved;
  for (const language of languages) {
    const raw = language.toLowerCase().split(/[-_]/)[0];
    const code = raw === 'in' ? 'id' : raw;
    if (isLocale(code)) return code;
  }
  return 'en';
}
export const localePath = (locale: Locale, path = '/') => `/${locale}${path}`;
