<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import {
    catalogs,
    locales,
    isLocale,
    localeNames,
    htmlLanguages,
    detectLocale,
    direction,
    stripLocale,
    localePath
  } from '$lib/i18n';
  import { chromeCopy } from '$lib/i18n/chrome';
  let { children } = $props();
  let ready = $state(false);
  const locale = $derived(isLocale(page.params.lang) ? page.params.lang : 'en');
  const copy = $derived(catalogs[locale]);
  const chrome = $derived(chromeCopy[locale]);
  const link = (path = '/') => `${base}${localePath(locale, path)}`;
  const restPath = () => stripLocale(page.url.pathname.slice(base.length)) || '/';
  function switchLanguage(value: string) {
    const next = isLocale(value) ? value : detectLocale(navigator.languages);
    try {
      if (isLocale(value)) localStorage.setItem('typeodd.locale', value);
      else localStorage.removeItem('typeodd.locale');
    } catch {
      /* Explicit links still work without storage. */
    }
    void goto(`${base}${localePath(next, restPath())}${page.url.search}${page.url.hash}`, {
      noScroll: true,
      keepFocus: true
    });
  }
  $effect(() => {
    document.documentElement.lang = htmlLanguages[locale];
    document.documentElement.dir = direction(locale);
  });
  onMount(() => {
    ready = true;
    if (!isLocale(page.params.lang)) {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem('typeodd.locale');
      } catch {
        /* Browser fallback. */
      }
      const preferred = detectLocale(navigator.languages, saved);
      void goto(`${base}${localePath(preferred, restPath())}${page.url.search}${page.url.hash}`, {
        replaceState: true,
        noScroll: true
      });
    }
    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker
        .getRegistrations()
        .then(async (registrations) => {
          for (const registration of registrations) {
            if (
              [`${location.origin}/`, `${location.origin}/typeodd/`].includes(registration.scope) &&
              registration.active?.scriptURL.includes('/flutter_service_worker.js')
            )
              await registration.unregister();
          }
        })
        .catch(() => {});
    }
  });
</script>

<a class="skip-link" href="#main">{copy.skip}</a>
<header class="site-header wrap">
  <a class="brand" href={link()} aria-label={copy.home}
    ><span class="brand-mark" aria-hidden="true">↗</span>typeodd<span
      class="brand-dot"
      aria-hidden="true">✳</span
    ></a
  >
  <nav aria-label={copy.home}>
    <a href={`${link()}#play`}>{copy.play}</a><a href={link('/how-to-play/')}>{copy.guide}</a><a
      href={link('/about/')}>{copy.about} ↗</a
    >
  </nav>
  <div class="language-picker">
    <label for="display-language" class="sr-only">{copy.language}</label><span aria-hidden="true"
      >◎</span
    ><select
      id="display-language"
      disabled={!ready}
      value={locale}
      onchange={(e) => switchLanguage(e.currentTarget.value)}
      >{#each locales as lang}<option value={lang} lang={htmlLanguages[lang]} dir={direction(lang)}
          >{localeNames[lang]}</option
        >{/each}<option value="auto">{copy.auto}</option></select
    >
  </div>
</header>
<main id="main">{@render children()}</main>
<footer class="site-footer wrap">
  <nav aria-label={copy.about}>
    <a href={link('/faq/')}>{copy.faq}</a><a href={link('/privacy/')}>{copy.privacy}</a><a
      href="https://github.com/zendoclab/typeodd"
      target="_blank"
      rel="noreferrer">GitHub ↗</a
    >
  </nav>
  <span class="footer-credit"
    >{chrome.creator}<br /><a href="https://me.zendoc.uk/" target="_blank" rel="noreferrer"
      >{chrome.works} ↗</a
    ><br />© {new Date().getFullYear()} Typeodd</span
  >
</footer>
