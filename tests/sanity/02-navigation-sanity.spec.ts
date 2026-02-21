// spec: specs/accord-biopharma-test-plan.md
// Sanity Test: Navigation - Critical Functionality
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.accordbiopharma.com';

test.describe('Sanity: Navigation Menu Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Our Culture menu item is clickable and navigates correctly', async ({ page }) => {
    // Click on Our Culture
    await page.click('a:has-text("Our Culture")');
    
    // Wait for navigation and verify
    await page.waitForURL('**/our-culture/');
    await expect(page).toHaveTitle('Our Culture - Accord BioPharma');
  });

  test('Our Therapeutic Areas menu item is clickable and navigates correctly', async ({ page }) => {
    // Click on Our Therapeutic Areas
    await page.click('a:has-text("Our Therapeutic Areas")');
    
    // Wait for navigation and verify
    await page.waitForURL('**/our-therapeutic-areas/');
    await expect(page).toHaveTitle('Our Therapeutic Areas - Accord BioPharma');
  });

  test('Contact Us menu item is clickable and navigates correctly', async ({ page }) => {
    // Click on Contact Us
    await page.click('a:has-text("Contact Us")');
    
    // Wait for navigation and verify
    await page.waitForURL('**/contact-us/');
    await expect(page).toHaveTitle('Contact Us - Accord BioPharma');
  });

  test('Logo click returns to homepage', async ({ page }) => {
    // First navigate away
    await page.click('a:has-text("Contact Us")');
    await page.waitForURL('**/contact-us/');
    
    // Click logo
    const logo = page.locator('a[href*="accordbiopharma.com"]').first();
    await logo.click();
    
    // Should return to homepage
    await page.waitForURL(BASE_URL + '/');
    await expect(page).toHaveTitle('Home - Accord BioPharma');
  });

  test('Menu links have proper href attributes', async ({ page }) => {
    // Check Our Culture href
    let link = page.locator('a:has-text("Our Culture")').first();
    await expect(link).toHaveAttribute('href', /our-culture/);
    
    // Check Our Therapeutic Areas href
    link = page.locator('a:has-text("Our Therapeutic Areas")').first();
    await expect(link).toHaveAttribute('href', /our-therapeutic-areas/);
    
    // Check Contact Us href
    link = page.locator('a:has-text("Contact Us")').first();
    await expect(link).toHaveAttribute('href', /contact-us/);
  });

  test('Skip to content link is present and functional', async ({ page }) => {
    // Check skip link exists
    const skipLink = page.locator('a:has-text("Skip to content")');
    await expect(skipLink).toBeVisible();
    
    // Verify it has correct href
    await expect(skipLink).toHaveAttribute('href', '#content');
  });

  test('Navigation menu items are keyboard accessible', async ({ page }) => {
    // Tab to first menu item and verify focus
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check if any menu item is focused
    const focusedElement = await page.evaluate(() => document.activeElement?.textContent);
    expect(focusedElement).toBeTruthy();
  });
});
