<script lang="ts">
  import { page } from '$app/state';
  import { base } from '$app/paths';
  import { catalogs, isLocale } from '$lib/i18n';
  import { chromeCopy } from '$lib/i18n/chrome';
  import { site } from '$lib/content';
  import Seo from './Seo.svelte';
  let { kind }: { kind: 'guide' | 'about' | 'faq' | 'privacy' } = $props();
  const locale = $derived(isLocale(page.params.lang) ? page.params.lang : 'en');
  const copy = $derived(catalogs[locale]);
  const path = $derived(kind === 'guide' ? '/how-to-play/' : `/${kind}/`);
  const title = $derived(kind === 'faq' ? copy.faqPageTitle : copy[`${kind}Title`]);
  const lead = $derived(kind === 'faq' ? copy.faqLead : copy[`${kind}Lead`]);
  const sections = $derived(
    kind === 'faq'
      ? copy.faqs.map((faq) => ({ title: faq.q, body: faq.a }))
      : copy[`${kind}Sections`]
  );
  const schema = $derived(
    kind === 'faq'
      ? [
          {
            '@type': 'FAQPage',
            '@id': `${site.url}/${locale}/faq/#faq`,
            mainEntity: copy.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a }
            }))
          }
        ]
      : []
  );
</script>

<Seo title={`Typeodd — ${title}`} description={lead} {path} {schema} />
<article class="document-page">
  <span class="eyebrow">Typeodd / {copy[kind]}</span>
  <h1>{title}</h1>
  <p class="lead">{lead}</p>
  {#each sections as section}<section>
      <h2>{section.title}</h2>
      <p>{section.body}</p>
    </section>{/each}{#if kind === 'about'}<p class="project-links">
      <a href="https://github.com/zendoclab/typeodd" target="_blank" rel="noreferrer">GitHub ↗</a> ·
      <a href="https://me.zendoc.uk/" target="_blank" rel="noreferrer"
        >{chromeCopy[locale].works} ↗</a
      >
    </p>{/if}<a class="button button-dark" href={`${base}/${locale}/#play`}>{copy.start} ↗</a>
</article>
