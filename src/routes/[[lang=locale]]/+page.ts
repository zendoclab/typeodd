import { locales } from '$lib/i18n';
export function entries() {
  return [{}, ...locales.map((lang) => ({ lang }))];
}
