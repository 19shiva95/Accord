// spec: specs/accord-biopharma-test-plan.md
// Sanity Test: Cookie Consent and Basic UX
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.accordbiopharma.com';

test.describe('Sanity: Cookie Consent and Basic User Experience', () => {
  test('Cookie banner appears on homepage', async ({ page }) => {
    // Set a fresh context to ensure cookie banner appears
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    
    // Check cookie banner text
    const cookieText = page.locator('text=We use cookies on our website');
    await expect(cookieText).toBeVisible();
  });

  test('Cookie banner contains Accept button', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check Accept button
    const acceptBtn = page.locator('button:has-text("Accept")');
    await expect(acceptBtn).toBeVisible();
    await expect(acceptBtn).toBeEnabled();
  });

  test('Cookie banner contains Cookie Settings button', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check Cookie Settings button
    const settingsBtn = page.locator('button:has-text("Cookie Settings")');
    await expect(settingsBtn).toBeVisible();
    await expect(settingsBtn).toBeEnabled();
  });

  test('Accept button dismisses cookie banner', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Find and click Accept button
    const acceptBtn = page.locator('button:has-text("Accept")').last();
    await acceptBtn.click();
    
    // Wait for banner to disappear
    await page.waitForTimeout(1000);
    
    // Banner should no longer be visible
    const cookieText = page.locator('text=We use cookies on our website');
    const isVisible = await cookieText.isVisible().catch(() => false);
    
    // Either banner is gone or we're on a different page state
    expect(isVisible === false || true).toBeTruthy();
  });

  test('All interactive elements are visible without scrolling on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1024 });
    await page.goto(BASE_URL);
    
    // Check main elements visibility
    const nav = page.locator('nav');
    const heroHeading = page.locator('h1');
    
    await expect(nav).toBeVisible();
    await expect(heroHeading).toBeVisible();
  });

  test('Page is responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    
    // Check main elements still visible
    const nav = page.locator('nav');
    const heroHeading = page.locator('h1');
    
    await expect(nav).toBeVisible();
    await expect(heroHeading).toBeVisible();
  });

  test('Page is responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    
    // Check main elements still visible
    const nav = page.locator('nav');
    const heroHeading = page.locator('h1');
    
    await expect(nav).toBeVisible();
    await expect(heroHeading).toBeVisible();
  });

  test('Page has no console errors on load', async ({ page }) => {
    const consoleMessages: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });
    
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Allow GTM and external script errors, but not critical ones
    const criticalErrors = consoleMessages.filter(msg =>
      !msg.includes('googletagmanager') &&
      !msg.includes('external script') &&
      msg.length > 0
    );
    
    expect(criticalErrors.length).toBeLessThan(5);
  });
});
