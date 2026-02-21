// spec: specs/accord-biopharma-test-plan.md
// Sanity Test: News Carousel and Content
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.accordbiopharma.com';

test.describe('Sanity: News Carousel and Homepage Content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('News carousel displays on homepage', async ({ page }) => {
    // Look for news carousel content
    const carousel = page.locator('[class*="carousel"], [class*="slider"]').first();
    await expect(carousel).toBeVisible();
  });

  test('News items contain product names (IMULDOSA, HERCESSI, UDENYCA)', async ({ page }) => {
    // Check for product names in news section
    const newsSection = page.locator('text=IMULDOSA|HERCESSI|UDENYCA|CLOMID').first();
    await expect(newsSection).toBeVisible();
  });

  test('Superscript symbols render correctly in product names', async ({ page }) => {
    // Check for registered trademark symbols
    const trademarkSymbols = page.locator('sup');
    const count = await trademarkSymbols.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('OUR OUTLOOK section displays with carousel controls', async ({ page }) => {
    // Check for OUR OUTLOOK heading
    const outlookSection = page.locator('text=OUR OUTLOOK');
    await expect(outlookSection).toBeVisible();
    
    // Check for slide navigation buttons
    const buttons = page.locator('button:has-text("Go to slide")');
    const count = await buttons.count();
    
    expect(count).toBeGreaterThanOrEqual(6); // Should have at least 6 slide buttons
  });

  test('Outlook carousel displays all 6 slides', async ({ page }) => {
    // Check for slide content
    const slideContents = [
      'collaboration',
      'patients\' lives',
      'trusted partners',
      'quality therapies',
      'before and after',
      'Beyond Biology'
    ];

    for (const content of slideContents) {
      const slideContent = page.locator(`text=${content}`);
      // At least one should be visible or rendered
      const count = await slideContent.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('Outlook carousel slide buttons are clickable', async ({ page }) => {
    // Get slide buttons
    const buttons = page.locator('button:has-text("Go to slide")');
    const count = await buttons.count();
    
    // Click first button
    if (count > 0) {
      await buttons.first().click();
      await page.waitForTimeout(500);
      
      // Verify we're on the slide
      const firstSlideContent = page.locator('text=collaboration');
      await expect(firstSlideContent).toBeVisible();
    }
  });

  test('Doctor image is displayed in hero section', async ({ page }) => {
    // Check for hero image with alt text
    const heroImage = page.locator('img[alt*="doctor"]');
    await expect(heroImage).toBeVisible();
  });

  test('News links are clickable and have valid hrefs', async ({ page }) => {
    // Get news links
    const newsLinks = page.locator('a[href*="prnewswire"]');
    const count = await newsLinks.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Check first link has valid href
    const firstLink = newsLinks.first();
    const href = await firstLink.getAttribute('href');
    expect(href).toContain('prnewswire.com');
  });
});
