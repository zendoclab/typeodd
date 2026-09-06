// Render the code-native brand system as share/install PNGs. No image service required.
import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome' });
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1
});
await page.setContent(
  `<html><head><style>*{box-sizing:border-box}body{margin:0;background:#f6f5f2;color:#302c36;font-family:Arial,sans-serif;padding:56px 72px}.brand{font-size:30px;font-weight:bold}.badge{float:right;font-size:13px;letter-spacing:2px;color:#88748e}h1{font-size:80px;font-weight:500;letter-spacing:-4px;line-height:1.06;margin:54px 0 30px}h1 span{color:#8f769b}.sample{position:relative;background:#f1e4e8;padding:20px;font-size:25px;letter-spacing:2px}.mark{position:absolute;left:20px;top:21px;width:170px;height:28px;background:rgba(100,100,100,.96)}.bottom{margin-top:35px;font-size:14px;letter-spacing:2px;display:flex;justify-content:space-between}.tag{background:#d3edaa;padding:12px 18px;border-radius:4px}</style></head><body><div class="brand">typeodd ✳<span class="badge">CLASSIC / SOLO + 1:1</span></div><h1>Type faster.<br><span>Remember more.</span></h1><div class="sample">Read ahead. Trust your memory. Hold your nerve.<span class="mark"></span></div><div class="bottom"><span>SPEED · MEMORY · NERVE</span><span class="tag">PLAY FREE ↗</span></div></body></html>`
);
await page.screenshot({ path: 'static/og-card.png' });
for (const size of [192, 512]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<html><body style="margin:0;background:#242820;display:grid;place-items:center;width:100vw;height:100vh"><svg width="60%" viewBox="0 0 64 64"><path d="M18 46 45 19M20 19h25v25" fill="none" stroke="#c7f26b" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg></body></html>`
  );
  await page.screenshot({ path: `static/icon-${size}.png` });
}
await browser.close();
