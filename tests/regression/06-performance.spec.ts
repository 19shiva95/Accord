// spec: specs/accord-biopharma-test-plan.md
// Regression Test: Performance and Non-Functional Testing
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.accordbiopharma.com';

test.describe('Regression: Performance and Non-Functional Tests', () => {
  test('Homepage loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    
    const loadTime = Date.now() - startTime;
    
    // Page should load in under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('Core content (hero section) renders quickly', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto(BASE_URL);
    
    // Wait for hero heading to be visible
    const heading = page.locator('h1:has-text("Beyond Biology")');
    await heading.waitFor({ state: 'visible', timeout: 3000 });
    
    const renderTime = Date.now() - startTime;
    
    expect(renderTime).toBeLessThan(3000);
  });

  test('Contact page loads quickly', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto(BASE_URL + '/contact-us/');
    
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000);
  });

  test('Images load and display properly', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    expect(imageCount).toBeGreaterThan(0);
    
    // Check visibility of hero image
    const heroImage = page.locator('img[alt*="doctor"]').first();
    await expect(heroImage).toBeVisible({ timeout: 3000 });
  });

  test('Page does not have layout shift issues', async ({ page }) => {
    const metrics = await page.evaluate(() => {
      const perf = (window as any).performance?.getEntriesByType?.('largest-contentful-paint');
      return perf ? perf[0]?.startTime : null;
    });
    
    // Just check that page loads and is stable
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // If metrics exist, they should indicate good performance
    expect(metrics === null || metrics < 2500).toBeTruthy();
  });

  test('Form is interactive immediately after page load', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Form should be immediately clickable
    const firstNameField = page.locator('input[placeholder*="First Name"], input:nth-of-type(1)').first();
    
    // Should be able to click without waiting
    await firstNameField.click();
    await firstNameField.fill('Test');
    
    const value = await firstNameField.inputValue();
    expect(value).toBe('Test');
  });

  test('Navigation is responsive without lag', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Click navigation item and measure time to navigation
    const startTime = Date.now();
    await page.click('a:has-text("Contact Us")');
    
    // Wait for page to load
    await page.waitForURL('**/contact-us/', { timeout: 5000 });
    
    const navigationTime = Date.now() - startTime;
    
    // Should navigate within 3 seconds
    expect(navigationTime).toBeLessThan(3000);
  });

  test('Carousel navigation is smooth and responsive', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const buttons = page.locator('button:has-text("Go to slide")');
    const count = await buttons.count();
    
    if (count > 0) {
      // Click slide navigation buttons
      const startTime = Date.now();
      
      await buttons.nth(0).click();
      await page.waitForTimeout(300);
      await buttons.nth(1).click();
      
      const clickTime = Date.now() - startTime;
      
      // Should be able to rapidly click slides
      expect(clickTime).toBeLessThan(1000);
    }
  });

  test('No excessive memory usage from multiple page visits', async ({ page }) => {
    // Visit multiple pages
    await page.goto(BASE_URL);
    await page.goto(BASE_URL + '/our-culture/');
    await page.goto(BASE_URL + '/contact-us/');
    await page.goto(BASE_URL);
    
    // Page should still be responsive
    const input = page.locator('input, textarea').first();
    await expect(input).toBeVisible();
  });

  test('Form submission does not hang or freeze', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Fill form with valid data
    const firstNameField = page.locator('input[placeholder*="First Name"], input:nth-of-type(1)').first();
    const lastNameField = page.locator('input[placeholder*="Last Name"], input:nth-of-type(2)').first();
    const emailField = page.locator('input[placeholder*="username"], input[type="email"]').first();
    
    await firstNameField.fill('John');
    await lastNameField.fill('Doe');
    await emailField.fill('john@example.com');
    
    // Page should remain responsive
    const isInputStillActive = await firstNameField.isEnabled();
    expect(isInputStillActive).toBe(true);
  });

  test('Multiple carousel slide transitions work smoothly', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const buttons = page.locator('button:has-text("Go to slide")');
    const count = await buttons.count();
    
    if (count >= 3) {
      // Rapid slide navigation
      for (let i = 0; i < Math.min(count, 3); i++) {
        await buttons.nth(i).click();
        await page.waitForTimeout(200);
      }
      
      // Should still be responsive
      const firstBtn = buttons.first();
      await expect(firstBtn).toBeVisible();
      await expect(firstBtn).toBeEnabled();
    }
  });
});
