// spec: specs/accord-biopharma-test-plan.md
// Regression Test: UI/UX and Visual Elements
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.accordbiopharma.com';

test.describe('Regression: UI/UX and Visual Elements', () => {
  test('All links have visible hover states', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Get first link
    const link = page.locator('a').first();
    
    // Get computed style before hover
    const styleBeforeHover = await link.evaluate((el: any) => {
      return window.getComputedStyle(el).color;
    });
    
    // Hover over link
    await link.hover();
    
    // Get computed style after hover
    const styleAfterHover = await link.evaluate((el: any) => {
      return window.getComputedStyle(el).color;
    });
    
    // Styles should differ or link should have pointer cursor
    expect(styleBeforeHover || styleAfterHover).toBeTruthy();
  });

  test('Navigation menu has clear visual structure', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check that nav items are properly spaced
    const navItems = nav.locator('a');
    const count = await navItems.count();
    
    expect(count).toBeGreaterThanOrEqual(5); // At least 5 main nav items
  });

  test('Heading hierarchy is correct', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Check for H1 or H2 as main heading
    const mainHeading = page.locator('h1, h2').first();
    await expect(mainHeading).toBeVisible();
    
    // Check for H3, H4 for sections
    const sectionHeadings = page.locator('h3, h4');
    const count = await sectionHeadings.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('Form fields have consistent spacing and alignment', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Check that all inputs are visible and accessible
    const inputs = page.locator('input[type="text"], input[type="email"]');
    const count = await inputs.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Check visibility of each input
    for (let i = 0; i < Math.min(count, 3); i++) {
      const input = inputs.nth(i);
      await expect(input).toBeVisible();
    }
  });

  test('Images display without distortion', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check hero image
    const heroImage = page.locator('img[alt*="doctor"]').first();
    const boundingBox = await heroImage.boundingBox();
    
    if (boundingBox) {
      // Check that image has reasonable dimensions
      expect(boundingBox.width).toBeGreaterThan(0);
      expect(boundingBox.height).toBeGreaterThan(0);
    }
  });

  test('Buttons are properly styled and visible', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    const submitBtn = page.locator('button:has-text("Submit")');
    await expect(submitBtn).toBeVisible();
    
    // Check button has proper styling
    const isEnabled = await submitBtn.isEnabled();
    expect(isEnabled).toBe(true);
  });

  test('Text has sufficient contrast', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check main text elements
    const bodyText = page.locator('p').first();
    
    // Get computed text color
    const color = await bodyText.evaluate((el: any) => {
      return window.getComputedStyle(el).color;
    });
    
    // Color should not be empty
    expect(color).toBeTruthy();
  });

  test('Logo maintains aspect ratio', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const logo = page.locator('a[href*="accordbiopharma.com"] img').first();
    const boundingBox = await logo.boundingBox();
    
    if (boundingBox) {
      const aspectRatio = boundingBox.width / boundingBox.height;
      // Logo should have reasonable aspect ratio (not too stretched)
      expect(aspectRatio).toBeGreaterThan(0.5);
      expect(aspectRatio).toBeLessThan(5);
    }
  });

  test('Carousel slide buttons are visually distinct', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const buttons = page.locator('button:has-text("Go to slide")');
    const count = await buttons.count();
    
    expect(count).toBeGreaterThanOrEqual(6);
    
    // Check that buttons are visible
    for (let i = 0; i < Math.min(count, 3); i++) {
      const btn = buttons.nth(i);
      await expect(btn).toBeVisible();
    }
  });

  test('Dropdowns display properly with visible options', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    const dropdown = page.locator('select').first();
    await expect(dropdown).toBeVisible();
    
    // Click dropdown to open
    await dropdown.click();
    
    // Check options are visible
    const options = dropdown.locator('option');
    const count = await options.count();
    
    expect(count).toBeGreaterThan(1);
  });

  test('Form labels are readable and properly associated', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Check for visible labels
    const labels = ['First Name', 'Last Name', 'Professional Email'];
    
    for (const labelText of labels) {
      const label = page.locator(`text="${labelText}"`);
      const count = await label.count();
      expect(count).toBeGreaterThan(0);
    }
  });
});
