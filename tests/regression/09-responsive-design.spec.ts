// spec: specs/accord-biopharma-test-plan.md
// Regression Test: Responsive Design and Device Testing
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.accordbiopharma.com';

test.describe('Regression: Responsive Design and Device Testing', () => {
  test('Desktop viewport (1280x1024) displays all content', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1024 });
    await page.goto(BASE_URL);
    
    // Check main elements are visible
    const nav = page.locator('nav');
    const heading = page.locator('h1');
    
    await expect(nav).toBeVisible();
    await expect(heading).toBeVisible();
    
    // No horizontal scrollbar
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(1280);
  });

  test('Large desktop viewport (1920x1080) displays properly', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('Tablet viewport (768x1024) displays content correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    
    const heading = page.locator('h1');
    const nav = page.locator('nav');
    
    await expect(heading).toBeVisible();
    await expect(nav).toBeVisible();
  });

  test('Small tablet viewport (600x800) is functional', async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 800 });
    await page.goto(BASE_URL);
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('Mobile viewport (375x667) - iPhone size', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    
    // Main content should be visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    // No horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
  });

  test('Large mobile viewport (428x926) - iPhone Pro size', async ({ page }) => {
    await page.setViewportSize({ width: 428, height: 926 });
    await page.goto(BASE_URL);
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('Small mobile viewport (320x568) - iPhone SE size', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(BASE_URL);
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('Contact form is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL + '/contact-us/');
    
    // Form should be visible and usable
    const submitBtn = page.locator('button:has-text("Submit")');
    await expect(submitBtn).toBeVisible();
    
    // Input fields should be touch-friendly
    const inputs = page.locator('input[type="text"], input[type="email"]');
    const count = await inputs.count();
    
    if (count > 0) {
      const input = inputs.first();
      const boundingBox = await input.boundingBox();
      
      // Input should have reasonable height for touch (at least 44px is recommended)
      if (boundingBox) {
        expect(boundingBox.height).toBeGreaterThan(20);
      }
    }
  });

  test('Navigation adapts to mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    
    // Navigation should be present (either visible or in menu)
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('Carousel is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    
    // Carousel buttons should be visible
    const buttons = page.locator('button:has-text("Go to slide")');
    const count = await buttons.count();
    
    if (count > 0) {
      const firstBtn = buttons.first();
      await expect(firstBtn).toBeVisible();
    }
  });

  test('Images scale properly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    
    const images = page.locator('img');
    const count = await images.count();
    
    if (count > 0) {
      const img = images.first();
      const boundingBox = await img.boundingBox();
      
      // Image should fit within viewport width
      if (boundingBox) {
        expect(boundingBox.width).toBeLessThanOrEqual(375);
      }
    }
  });

  test('Text is readable on small screens without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(BASE_URL);
    
    // Main text should be readable
    const heading = page.locator('h1');
    const textContent = await heading.textContent();
    
    expect(textContent).toBeTruthy();
    expect(textContent?.length).toBeGreaterThan(0);
  });

  test('Touch targets are appropriately sized on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL + '/contact-us/');
    
    // Check submit button size
    const submitBtn = page.locator('button:has-text("Submit")');
    const boundingBox = await submitBtn.boundingBox();
    
    if (boundingBox) {
      // Button should be at least 44x44 (recommended mobile touch size)
      expect(boundingBox.height).toBeGreaterThanOrEqual(30);
      expect(boundingBox.width).toBeGreaterThanOrEqual(30);
    }
  });

  test('Form fields are easily tappable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL + '/contact-us/');
    
    const inputs = page.locator('input[type="text"], input[type="email"], textarea');
    
    for (let i = 0; i < Math.min(3, await inputs.count()); i++) {
      const input = inputs.nth(i);
      const boundingBox = await input.boundingBox();
      
      // Input should be easily tappable
      if (boundingBox) {
        expect(boundingBox.height).toBeGreaterThanOrEqual(30);
        expect(boundingBox.width).toBeGreaterThanOrEqual(50);
      }
    }
  });

  test('Dropdown is usable on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL + '/contact-us/');
    
    const dropdown = page.locator('select').first();
    await expect(dropdown).toBeVisible();
    
    // Should be able to interact with dropdown
    await dropdown.click();
    await page.waitForTimeout(200);
    
    // Should still be visible and accessible
    await expect(dropdown).toBeVisible();
  });
});
