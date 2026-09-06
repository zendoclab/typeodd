import { test, expect } from '@playwright/test';

test('opens directly into Classic and masks the actual upcoming letters', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('dialog', () => {
    throw new Error('Unexpected dialog');
  });
  await page.goto('en/');
  const input = page.locator('#typing-input');
  await expect(input).toBeEnabled();
  await expect(page.locator('iframe')).toHaveCount(0);
  await expect(page.locator('.hero,.features,.story-band')).toHaveCount(0);
  const text = await page.locator('.passage').innerText();
  await input.pressSequentially(text.slice(0, 5), { delay: 20 });
  await expect(page.locator('.occlusion-mask')).toHaveCSS('width', '1px');
  await input.pressSequentially(text.slice(5, 15), { delay: 20 });
  await expect(page.locator('.passage')).toHaveText(text.slice(15));
  await expect(input).toHaveValue('');
  const dimensions = await page.locator('.occlusion-mask').evaluate((el) => {
    const box = el.getBoundingClientRect();
    const text = document.querySelector('.passage')!.getBoundingClientRect();
    return {
      width: box.width,
      left: box.left,
      textLeft: text.left,
      background: getComputedStyle(el).backgroundColor
    };
  });
  expect(dimensions.width).toBeGreaterThan(10);
  expect(dimensions.width).toBeLessThanOrEqual(47);
  expect(Math.abs(dimensions.left - dimensions.textLeft)).toBeLessThan(1);
  expect(dimensions.background).toMatch(/rgba\((100, 100, 100|180, 180, 180), 0\.96/);
  await page.screenshot({ path: '.codex-qa/classic-desktop.png', fullPage: true });
  await input.pressSequentially('~');
  await expect(page.locator('.occlusion-mask')).toHaveAttribute('data-width', '1');
  await input.press('Backspace');
  await page.getByRole('button', { name: 'Restart', exact: false }).click();
  await expect(page.locator('.passage')).toHaveText(text);
  await expect(page.locator('.white-veil')).toHaveAttribute('data-alpha', '0');
  expect(errors).toEqual([]);
});

test('finishes only after the full passage and stores a versioned result', async ({ page }) => {
  await page.goto('en/');
  await expect(page.locator('#typing-input')).toBeEnabled();
  const text = await page.locator('.passage').innerText();
  await page.locator('#typing-input').pressSequentially(text);
  await expect(page.locator('.result-view')).toBeVisible();
  await expect(page.locator('.history-list>div')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('.history-list>div')).toHaveCount(1);
  await expect(page.locator('.result-view')).toHaveCount(0);
});

test('commits Korean composition once, including duplicate browser callback', async ({ page }) => {
  await page.goto('ko/');
  const input = page.locator('#typing-input');
  await expect(input).toBeEnabled();
  await page.locator('#language').selectOption('ko');
  const target = await page.locator('.passage').innerText();
  await input.evaluate((el, first) => {
    const field = el as HTMLTextAreaElement;
    field.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
    field.value = 'ㄱ';
    field.dispatchEvent(new InputEvent('input', { bubbles: true, isComposing: true }));
    field.value = first;
    field.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true, data: first }));
    field.value = first;
    field.dispatchEvent(
      new InputEvent('input', { bubbles: true, data: first, inputType: 'insertCompositionText' })
    );
  }, target[0]);
  await expect(page.locator('.metric.score strong')).toHaveText('1점');
  await expect(page.locator('.passage')).toHaveText(target.slice(1));
  expect(
    await input.evaluate(
      (el) => !el.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, cancelable: true }))
    )
  ).toBe(true);
});

test('detects browser language and keeps explicit selections on small screens', async ({
  browser
}) => {
  const context = await browser.newContext({
    locale: 'ja-JP',
    viewport: { width: 360, height: 800 }
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await expect(page).toHaveURL(/\/ja\/$/);
  await page.locator('#display-language').selectOption('es');
  await expect(page).toHaveURL(/\/es\/$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: '.codex-qa/classic-mobile.png', fullPage: true });
  await page.goto('http://127.0.0.1:4173/');
  await expect(page).toHaveURL(/\/es\/$/);
  await context.close();
});

test('two real clients match, race on the same passage and receive server results', async ({
  browser
}) => {
  test.setTimeout(90000);
  const a = await browser.newContext();
  const b = await browser.newContext();
  const p = await a.newPage();
  const q = await b.newPage();
  const errors: string[] = [];
  for (const page of [p, q]) {
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('http://127.0.0.1:4173/en/');
    await page.getByRole('button', { name: '1:1 match', exact: true }).click();
    await page.getByRole('button', { name: 'Find an opponent', exact: false }).click();
  }
  await expect(p.locator('#typing-input')).toBeEnabled({ timeout: 15000 });
  await expect(q.locator('#typing-input')).toBeEnabled();
  const text = await p.locator('.passage').innerText();
  await expect(q.locator('.passage')).toHaveText(text);
  await p.locator('#typing-input').pressSequentially(text.slice(0, 10), { delay: 30 });
  await expect(q.locator('.race-track .opponent')).not.toContainText('Opponent 0%');
  await p.locator('#typing-input').pressSequentially(text.slice(10), { delay: 25 });
  await expect(p.locator('.match-lobby h2')).toHaveText('You win.', { timeout: 10000 });
  await expect(q.locator('.match-lobby h2')).toHaveText('Opponent wins.');
  expect(errors).toEqual([]);
  await a.close();
  await b.close();
});
