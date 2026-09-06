import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:4173/',
    headless: true,
    channel: process.env.CI ? undefined : 'chrome'
  },
  webServer: [
    {
      command: 'npm run preview -- --port 4173',
      url: 'http://127.0.0.1:4173/',
      reuseExistingServer: !process.env.CI
    },
    {
      command: 'cargo run --manifest-path server/Cargo.toml',
      url: 'http://127.0.0.1:8787/health',
      reuseExistingServer: !process.env.CI,
      timeout: 180000
    }
  ]
});
