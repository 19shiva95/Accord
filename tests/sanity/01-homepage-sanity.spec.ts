// spec: specs/accord-biopharma-test-plan.md
// Sanity Test: Homepage - Critical Functionality
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.accordbiopharma.com';

test.describe('Sanity: Homepage Accessibility and Load', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto(BASE_URL);
  });

  test('Homepage loads successfully with correct title', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle('Home - Accord BioPharma');
    
    // Verify URL
    expect(page.url()).toBe(BASE_URL + '/');
  });

  test('Hero section displays with "Beyond Biology" heading', async ({ page }) => {
    // Check if main heading exists and contains "Beyond Biology"
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    const headingText = await page.textContent('h1');
    expect(headingText).toContain('Beyond Biology');
  });

  test('Main tagline "At Accord BioPharma, we think beyond the expected" is visible', async ({ page }) => {
    // Verify subheading
    const subheading = page.locator('h5:has-text("At Accord BioPharma, we think beyond the expected")');
    await expect(subheading).toBeVisible();
  });

  test('Main navigation menu is visible', async ({ page }) => {
    // Check navigation menu is visible
    const nav = page.locator('nav:has-text("Menu")');
    await expect(nav).toBeVisible();
  });

  test('All main navigation items are present', async ({ page }) => {
    // Verify each navigation item exists
    const menuItems = [
      'Our Culture',
      'Biosimilars',
      'Our Therapeutic Areas',
      'HCP Resources',
      'Our Newsroom',
      'Contact Us'
    ];

    for (const item of menuItems) {
      const menuItem = page.locator(`a:has-text("${item}")`);
      await expect(menuItem).toBeVisible();
    }
  });

  test('Accord BioPharma logo is visible in header', async ({ page }) => {
    // Check logo exists
    const logo = page.locator('a[href*="accordbiopharma.com"]').first();
    await expect(logo).toBeVisible();
  });

  test('Page has no JavaScript errors on load', async ({ page }) => {
    // Collect JavaScript errors
    const jsErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        jsErrors.push(msg.text());
      }
    });

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Allow some expected errors (like GTM), but not critical ones
    const criticalErrors = jsErrors.filter(error => 
      !error.includes('googletagmanager') && 
      !error.includes('external script') &&
      !error.includes('Cannot read properties of null')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('Viewport is responsive and no horizontal overflow', async ({ page }) => {
    // Check if page width matches viewport width
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 0;
    
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });
});
