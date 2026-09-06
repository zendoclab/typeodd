<script lang="ts">
  import { page } from '$app/state';
  import { site } from '$lib/content';
  import { catalogs, locales, isLocale, htmlLanguages, ogLocales } from '$lib/i18n';
  let {
    title,
    description,
    path = '/',
    schema = []
  }: { title?: string; description?: string; path?: string; schema?: object[] } = $props();
  const locale = $derived(isLocale(page.params.lang) ? page.params.lang : 'en');
  const copy = $derived(catalogs[locale]);
  const url = $derived(`${site.url}/${locale}${path}`);
  const json = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
</script>

<svelte:head>
  <title>{title ?? copy.title}</title>
  <meta name="description" content={description ?? copy.description} />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href={url} />
  {#each locales as lang}<link
      rel="alternate"
      hreflang={htmlLanguages[lang]}
      href={`${site.url}/${lang}${path}`}
    />{/each}
  <link rel="alternate" hreflang="x-default" href={`${site.url}${path}`} />
  <meta property="og:type" content="website" /><meta property="og:site_name" content="Typeodd" />
  <meta property="og:locale" content={ogLocales[locale]} />
  {#each locales.filter((lang) => lang !== locale) as lang}<meta
      property="og:locale:alternate"
      content={ogLocales[lang]}
    />{/each}
  <meta property="og:title" content={title ?? copy.title} /><meta
    property="og:description"
    content={description ?? copy.description}
  />
  <meta property="og:url" content={url} /><meta
    property="og:image"
    content={`${site.url}/og-card.png`}
  />
  <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Typeodd — Type faster. Remember more." />
  <meta name="twitter:card" content="summary_large_image" /><meta
    name="twitter:title"
    content={title ?? copy.title}
  />
  <meta name="twitter:description" content={description ?? copy.description} /><meta
    name="twitter:image"
    content={`${site.url}/og-card.png`}
  />
  {@html `<script type="application/ld+json">${json({ '@context': 'https://schema.org', '@graph': schema })}</script>`}
</svelte:head>
