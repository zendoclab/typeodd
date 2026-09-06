<script lang="ts">
  import { page } from '$app/state';
  import Seo from '$lib/components/Seo.svelte';
  import Game from '$lib/components/Game.svelte';
  import { site } from '$lib/content';
  import { catalogs, isLocale, locales, htmlLanguages } from '$lib/i18n';
  const locale = $derived(isLocale(page.params.lang) ? page.params.lang : 'en');
  const copy = $derived(catalogs[locale]);
  const schema = $derived([
    {
      '@type': ['VideoGame', 'WebApplication'],
      name: 'Typeodd',
      url: `${site.url}/${locale}/`,
      description: copy.description,
      applicationCategory: 'GameApplication',
      operatingSystem: 'Web browser',
      inLanguage: locales.map((lang) => htmlLanguages[lang]),
      playMode: ['SinglePlayer', 'MultiPlayer'],
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'zendoc', url: 'https://me.zendoc.uk/' }
    }
  ]);
</script>

<Seo {schema} />
<div class="game-intro wrap">
  <h1>Typeodd <span>Classic</span></h1>
  <p>{copy.ruleHint}</p>
</div>
<Game />
