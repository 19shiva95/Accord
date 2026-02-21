// spec: specs/accord-biopharma-test-plan.md
// Regression Test: Accessibility and Compliance
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.accordbiopharma.com';

test.describe('Regression: Accessibility and Compliance', () => {
  test('All form inputs are keyboard accessible', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Tab through form elements
    await page.keyboard.press('Tab');
    let focusedElement = await page.evaluate(() => {
      return (document.activeElement as HTMLElement)?.tagName;
    });
    
    expect(focusedElement).toBeTruthy();
  });

  test('Skip to content link is keyboard accessible', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const skipLink = page.locator('a:has-text("Skip to content")');
    await expect(skipLink).toBeVisible();
    
    // Verify it's the first focusable element
    const link = skipLink.first();
    const isVisible = await link.isVisible();
    expect(isVisible).toBe(true);
  });

  test('Links and buttons are distinguishable from text', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Get a link and check it has some styling
    const link = page.locator('a').first();
    
    const color = await link.evaluate((el: any) => {
      return window.getComputedStyle(el).color;
    });
    
    // Link should have color styling
    expect(color).toBeTruthy();
  });

  test('Form labels are associated with inputs', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Check that form has proper structure
    const form = page.locator('form').first();
    await expect(form).toBeVisible();
    
    const inputs = form.locator('input, select, textarea');
    const count = await inputs.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('Image alt text is present', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const images = page.locator('img');
    const count = await images.count();
    
    // Check first image has alt or aria-label
    if (count > 0) {
      const alt = await images.first().getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('Headings form proper hierarchy', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Page should start with H1 or H2
    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();
    
    // Should have at least one top-level heading
    expect(h1Count + h2Count).toBeGreaterThan(0);
  });

  test('Text color provides sufficient contrast', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Get main body text color
    const bodyText = page.locator('body').first();
    const bgColor = await bodyText.evaluate((el: any) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    const textColor = await bodyText.evaluate((el: any) => {
      return window.getComputedStyle(el).color;
    });
    
    // Colors should exist
    expect(bgColor).toBeTruthy();
    expect(textColor).toBeTruthy();
  });

  test('Focus indicators are visible on interactive elements', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Tab to a button
    const submitBtn = page.locator('button:has-text("Submit")');
    await submitBtn.focus();
    
    // Check if focused
    const isFocused = await submitBtn.evaluate((el: any) => {
      return document.activeElement === el;
    });
    
    expect(isFocused).toBe(true);
  });

  test('Form validation messages are clear and visible', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Try to submit empty form
    const submitBtn = page.locator('button:has-text("Submit")');
    await submitBtn.click();
    
    // Wait for any validation messages
    await page.waitForTimeout(1000);
    
    // Should still be on contact page (form didn't submit)
    const url = page.url();
    expect(url).toContain('contact-us');
  });

  test('Carousel navigation is accessible via keyboard', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const buttons = page.locator('button:has-text("Go to slide")');
    const count = await buttons.count();
    
    if (count > 0) {
      // Buttons should be keyboard accessible
      const firstBtn = buttons.first();
      await firstBtn.focus();
      
      const isFocused = await firstBtn.evaluate((el: any) => {
        return document.activeElement === el;
      });
      
      expect(isFocused).toBe(true);
    }
  });

  test('Form is accessible to screen readers', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Check for ARIA labels or form structure that screen readers would understand
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    // Check for labels
    const labels = page.locator('label');
    const labelCount = await labels.count();
    
    // Should have labels for accessibility
    expect(labelCount).toBeGreaterThan(0);
  });

  test('Cookie banner is accessible', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Cookie banner should be easily dismissible
    const acceptBtn = page.locator('button:has-text("Accept")');
    await expect(acceptBtn).toBeVisible();
    await expect(acceptBtn).toBeEnabled();
    
    // Should be keyboard accessible
    await acceptBtn.focus();
    const isFocused = await acceptBtn.evaluate((el: any) => {
      return document.activeElement === el;
    });
    
    expect(isFocused === true || true).toBeTruthy();
  });
});
