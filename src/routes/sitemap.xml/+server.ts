import { site } from '$lib/content';
import { locales, htmlLanguages } from '$lib/i18n';
export const prerender = true;
export function GET() {
  const paths = ['/', '/how-to-play/', '/about/', '/faq/', '/privacy/'];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${locales.flatMap((locale) => paths.map((path) => `<url><loc>${site.url}/${locale}${path}</loc>${locales.map((lang) => `<xhtml:link rel="alternate" hreflang="${htmlLanguages[lang]}" href="${site.url}/${lang}${path}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${site.url}${path}"/></url>`)).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
}
