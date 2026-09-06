import { test, expect } from '@playwright/test';
import { locales, catalogs, htmlLanguages, direction } from '../src/lib/i18n';
import { matchCopy } from '../src/lib/i18n/match';

test('all 14 browser languages open localized games and lobbies without mobile overflow', async ({
  browser
}) => {
  test.setTimeout(120000);
  for (const locale of locales) {
    const context = await browser.newContext({
      locale: htmlLanguages[locale],
      viewport: { width: 360, height: 800 }
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4173/');
    await expect(page).toHaveURL(new RegExp(`/${locale}/$`));
    await expect(page.locator('#typing-input')).toBeEnabled();
    await expect(page.locator('html')).toHaveAttribute('dir', direction(locale));
    await expect(page.locator('.game-intro p')).toHaveText(catalogs[locale].ruleHint);
    await expect(page.locator('#language')).toHaveValue(locale === 'ko' ? 'ko' : 'en');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    await page.getByRole('button', { name: matchCopy[locale].duel, exact: true }).click();
    await expect(page.locator('.match-lobby h2')).toHaveText(matchCopy[locale].duel);
    await expect(page.locator('.match-lobby p')).toHaveText(matchCopy[locale].rule);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    await context.close();
  }
});

test('language changes preserve deep links, browser preference, and typing progress across RTL', async ({
  browser
}) => {
  const context = await browser.newContext({ locale: 'fr-FR' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/fr/how-to-play/?from=help#main');
  await page.locator('#display-language').selectOption('ur');
  await expect(page).toHaveURL(/\/ur\/how-to-play\/\?from=help#main$/);
  await expect(page.locator('h1')).toHaveText(catalogs.ur.guideTitle);
  await page.goto('http://127.0.0.1:4173/');
  await expect(page).toHaveURL(/\/ur\/$/);
  await expect(page.locator('#typing-input')).toBeEnabled();
  const text = await page.locator('.passage').innerText();
  await page.locator('#typing-input').pressSequentially(text.slice(0, 8), { delay: 30 });
  await page.locator('#display-language').selectOption('ar');
  await expect(page).toHaveURL(/\/ar\/$/);
  await expect(page.locator('.passage')).toHaveText(text.slice(8));
  const boxes = await page.locator('.occlusion-mask').evaluate((el) => ({
    mask: el.getBoundingClientRect().left,
    text: document.querySelector('.passage')!.getBoundingClientRect().left
  }));
  expect(Math.abs(boxes.mask - boxes.text)).toBeLessThan(1);
  await page.locator('#display-language').selectOption('auto');
  await expect(page).toHaveURL(/\/fr\/$/);
  await expect(page.locator('.passage')).toHaveText(text.slice(8));
  expect(await page.evaluate(() => localStorage.getItem('typeodd.locale'))).toBeNull();
  await page.goto('http://127.0.0.1:4173/ko/');
  await expect(page.locator('#language')).toBeEnabled();
  await expect(page.locator('#language')).toHaveValue('ko');
  await page.locator('#language').selectOption('en');
  await page.reload();
  await expect(page.locator('#typing-input')).toBeEnabled();
  await expect(page.locator('#language')).toHaveValue('en');
  await context.close();
});
