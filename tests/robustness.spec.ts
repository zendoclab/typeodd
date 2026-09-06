import { test, expect } from '@playwright/test';

test('plays without local storage and exposes only an inline save failure', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw Error('blocked');
    };
    Storage.prototype.setItem = () => {
      throw Error('blocked');
    };
  });
  await page.goto('en/');
  const text = await page.locator('.passage').innerText();
  await page.locator('#typing-input').pressSequentially(text);
  await expect(page.locator('.result-view')).toBeVisible();
  await expect(page.getByRole('status')).toContainText('this screen only');
});

test('prerenders localized SEO content, alternates and FAQ answers without JavaScript', async ({
  browser,
  request
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const locale of ['en', 'ko', 'ja', 'zh', 'es']) {
    for (const path of ['', 'how-to-play/', 'faq/', 'about/', 'privacy/']) {
      expect((await page.goto(`http://127.0.0.1:4173/${locale}/${path}`))?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('html')).toHaveAttribute(
        'lang',
        locale === 'zh' ? 'zh-Hans' : locale
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://typeodd.cording.ai/${locale}/${path}`
      );
      await expect(page.locator('link[hreflang]')).toHaveCount(6);
      if (path === 'faq/') {
        const schema = JSON.parse(
          await page.locator('script[type="application/ld+json"]').innerText()
        );
        for (const faq of schema['@graph'][0].mainEntity) {
          await expect(page.getByRole('heading', { name: faq.name, exact: true })).toBeVisible();
          await expect(page.getByText(faq.acceptedAnswer.text, { exact: true })).toBeVisible();
        }
      }
    }
  }
  for (const asset of [
    'og-card.png',
    'manifest.webmanifest',
    'sitemap.xml',
    'robots.txt',
    'llms.txt',
    'flutter_service_worker.js'
  ])
    expect((await request.get(asset)).status()).toBe(200);
  await context.close();
});
