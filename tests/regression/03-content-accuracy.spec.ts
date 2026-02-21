// spec: specs/accord-biopharma-test-plan.md
// Regression Test: Content Accuracy and Text Rendering
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.accordbiopharma.com';

test.describe('Regression: Content Accuracy and Text Rendering', () => {
  test('Homepage content is accurate', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check main heading
    const heading = page.locator('h1');
    const headingText = await heading.textContent();
    expect(headingText).toContain('Beyond Biology');
    
    // Check tagline
    const tagline = page.locator('h5');
    const taglineText = await tagline.textContent();
    expect(taglineText).toContain('At Accord BioPharma, we think beyond the expected');
  });

  test('Our Culture page displays correct heading', async ({ page }) => {
    await page.goto(BASE_URL + '/our-culture/');
    
    const heading = page.locator('h1, h2:has-text("Our Culture")').first();
    await expect(heading).toBeVisible();
    
    const text = await heading.textContent();
    expect(text).toContain('Culture');
  });

  test('Corporate office information is accurate', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Check full address
    const address = page.locator('text=8041 Arco Corporate Drive');
    await expect(address).toBeVisible();
    
    // Check city and state
    const cityState = page.locator('text=Raleigh, NC 27617');
    await expect(cityState).toBeVisible();
  });

  test('Corporate phone number is correct', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    const phone = page.locator('text=+1 919.941.7878');
    await expect(phone).toBeVisible();
  });

  test('Patient Assistance phone number is correct', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    const phone = page.locator('text=+1 (866) 258-7151');
    await expect(phone).toBeVisible();
  });

  test('Patient Assistance business hours are displayed', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    const hours = page.locator('text=M-F 8:00 AM – 8:00 PM EST');
    await expect(hours).toBeVisible();
  });

  test('News items display product names correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const productNames = ['IMULDOSA', 'HERCESSI', 'UDENYCA'];
    
    for (const name of productNames) {
      const element = page.locator(`text=${name}`);
      const count = await element.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('Trademark symbols render correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check for registered trademark and trademark symbols
    const superscripts = page.locator('sup');
    const count = await superscripts.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('Outlook carousel contains all 6 slides with correct text', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const slides = [
      { button: 'Go to slide 1', content: 'collaboration' },
      { button: 'Go to slide 2', content: 'patients\' lives' },
      { button: 'Go to slide 3', content: 'partners' },
      { button: 'Go to slide 4', content: 'quality therapies' },
      { button: 'Go to slide 5', content: 'before and after' },
      { button: 'Go to slide 6', content: 'Beyond Biology' }
    ];
    
    for (const slide of slides) {
      const slideContent = page.locator(`text=${slide.content}`);
      const count = await slideContent.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('Contact form instructions are present', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Check for main instruction text
    const instruction = page.locator('text=Complete the form below to reach Accord BioPharma');
    await expect(instruction).toBeVisible();
  });

  test('Medical Information Request link is present in contact form', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    const link = page.locator('a:has-text("Medical Information Request")');
    await expect(link).toBeVisible();
    
    const href = await link.getAttribute('href');
    expect(href).toContain('medical-information');
  });

  test('Adverse Events reporting link is present', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    const link = page.locator('a:has-text("Adverse Events")');
    const count = await link.count();
    expect(count).toBeGreaterThan(0);
  });

  test('AccordCares portal link is present on contact page', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    const link = page.locator('a[href*="accordcaresportal"]');
    await expect(link).toBeVisible();
  });
});
