import type { Handle } from '@sveltejs/kit';
import { htmlLanguages, isLocale } from '$lib/i18n';
export const handle: Handle = async ({ event, resolve }) => {
  const locale = isLocale(event.params.lang) ? event.params.lang : 'en';
  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('<html lang="en">', `<html lang="${htmlLanguages[locale]}">`)
  });
};
