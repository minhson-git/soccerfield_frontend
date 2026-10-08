import process from 'node:process'
import { defineConfig, devices } from '@playwright/test'

const PORT = process.env.CI ? 4173 : 3000

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
    headless: !!process.env.CI,
  },

  // The app must work on desktop and mobile web
  projects: [
    { name: 'desktop-chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 14'] } },
  ],

  webServer: {
    command: process.env.CI ? 'pnpm preview' : 'pnpm dev',
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
})
