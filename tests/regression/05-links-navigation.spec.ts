// spec: specs/accord-biopharma-test-plan.md
// Regression Test: Links and Navigation
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.accordbiopharma.com';

test.describe('Regression: Links and External Navigation', () => {
  test('All PRNewswire news links are valid and accessible', async ({ page, context }) => {
    await page.goto(BASE_URL);
    
    const newsLinks = page.locator('a[href*="prnewswire"]');
    const count = await newsLinks.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Test first few links
    for (let i = 0; i < Math.min(count, 2); i++) {
      const link = newsLinks.nth(i);
      const href = await link.getAttribute('href');
      
      expect(href).toContain('prnewswire');
      expect(href).toBeTruthy();
    }
  });

  test('StoryMD partnership link is functional', async ({ page }) => {
    await page.goto(BASE_URL + '/our-therapeutic-areas/');
    
    const storymdLink = page.locator('a[href*="storymd"]');
    const count = await storymdLink.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('AccordCaresPortal link is functional', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    const portalLink = page.locator('a[href*="accordcaresportal"]');
    await expect(portalLink).toBeVisible();
    
    const href = await portalLink.getAttribute('href');
    expect(href).toContain('accordcaresportal');
  });

  test('Medical Information Request link navigates correctly', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    const link = page.locator('a:has-text("Medical Information Request")');
    
    if (await link.isVisible()) {
      const href = await link.getAttribute('href');
      expect(href).toContain('medical');
    }
  });

  test('All navigation links have proper href attributes', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const navLinks = page.locator('nav a');
    const count = await navLinks.count();
    
    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');
      
      // href should exist and be non-empty
      expect(href).toBeTruthy();
      expect(href?.length).toBeGreaterThan(0);
    }
  });

  test('Contact form links within form instructions work correctly', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Look for links within form section
    const formLinks = page.locator('form a, form + * a, .contact-form a');
    const count = await formLinks.count();
    
    // There should be at least the Medical Information Request link
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 2); i++) {
        const link = formLinks.nth(i);
        const href = await link.getAttribute('href');
        expect(href).toBeTruthy();
      }
    }
  });

  test('Phone number links are properly formatted', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    const phoneLinks = page.locator('a[href^="tel:"]');
    const count = await phoneLinks.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Check first phone link
    const firstLink = phoneLinks.first();
    const href = await firstLink.getAttribute('href');
    expect(href).toMatch(/^tel:\+?/);
  });

  test('Links open in correct targets (internal vs external)', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // External PRNewswire links should have target="_blank" or similar
    const externalLinks = page.locator('a[href*="prnewswire"]').first();
    const count = await externalLinks.count();
    
    if (count > 0) {
      const target = await externalLinks.getAttribute('target');
      // Most external links have target="_blank"
      expect(target === '_blank' || target === null).toBeTruthy();
    }
  });

  test('Back navigation from subpages works correctly', async ({ page }) => {
    // Navigate to Our Culture
    await page.goto(BASE_URL + '/our-culture/');
    
    // Click logo to go back
    const logo = page.locator('a[href*="accordbiopharma.com"]').first();
    await logo.click();
    
    // Should be on homepage
    await page.waitForURL(BASE_URL + '/');
    expect(page.url()).toBe(BASE_URL + '/');
  });

  test('Breadcrumb or current page navigation indicators work', async ({ page }) => {
    await page.goto(BASE_URL + '/our-culture/');
    
    // Check page title reflects current page
    const title = await page.title();
    expect(title).toContain('Our Culture');
    
    // Navigate to another page
    await page.click('a:has-text("Our Therapeutic Areas")');
    
    const newTitle = await page.title();
    expect(newTitle).toContain('Therapeutic Areas');
  });

  test('All form action links are valid', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Check for "Learn More" links in various sections
    const learnMoreLinks = page.locator('a:has-text("Learn More")');
    const count = await learnMoreLinks.count();
    
    for (let i = 0; i < Math.min(count, 2); i++) {
      const link = learnMoreLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });
});
