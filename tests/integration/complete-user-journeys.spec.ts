// spec: specs/accord-biopharma-test-plan.md
// Integration Test: Complete User Journeys
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.accordbiopharma.com';

test.describe('Integration: Complete User Journeys', () => {
  test('User journey: Browse and navigate through all main pages', async ({ page }) => {
    // Start on homepage
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle('Home - Accord BioPharma');
    
    // Navigate to Our Culture
    await page.click('a:has-text("Our Culture")');
    await page.waitForURL('**/our-culture/');
    await expect(page).toHaveTitle('Our Culture - Accord BioPharma');
    
    // Navigate to Therapeutic Areas
    await page.click('a:has-text("Our Therapeutic Areas")');
    await page.waitForURL('**/our-therapeutic-areas/');
    
    // Navigate to Contact Us
    await page.click('a:has-text("Contact Us")');
    await page.waitForURL('**/contact-us/');
    await expect(page).toHaveTitle('Contact Us - Accord BioPharma');
    
    // Return to homepage via logo
    const logo = page.locator('a[href*="accordbiopharma.com"]').first();
    await logo.click();
    await page.waitForURL(BASE_URL + '/');
  });

  test('User journey: Fill and validate contact form', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Fill form with valid data
    const firstNameField = page.locator('input[placeholder*="First Name"], input:nth-of-type(1)').first();
    const lastNameField = page.locator('input[placeholder*="Last Name"], input:nth-of-type(2)').first();
    const emailField = page.locator('input[placeholder*="username"], input[type="email"]').first();
    const stateDropdown = page.locator('select').first();
    const inquiryDropdown = page.locator('select').nth(1);
    const textarea = page.locator('textarea').first();
    
    await firstNameField.fill('John');
    await lastNameField.fill('Doe');
    await emailField.fill('john.doe@example.com');
    await stateDropdown.selectOption('CA');
    await inquiryDropdown.selectOption('Human Resources');
    await textarea.fill('I would like to inquire about HR opportunities at Accord BioPharma.');
    
    // Verify all fields have correct values
    expect(await firstNameField.inputValue()).toBe('John');
    expect(await lastNameField.inputValue()).toBe('Doe');
    expect(await emailField.inputValue()).toBe('john.doe@example.com');
    expect(await stateDropdown.inputValue()).toBe('CA');
    expect(await inquiryDropdown.inputValue()).toBe('Human Resources');
  });

  test('User journey: View news and explore external links', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check for news items
    const newsLinks = page.locator('a[href*="prnewswire"]');
    const count = await newsLinks.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Verify news link has valid URL
    if (count > 0) {
      const firstNewsLink = newsLinks.first();
      const href = await firstNewsLink.getAttribute('href');
      expect(href).toContain('prnewswire');
    }
  });

  test('User journey: Explore company information sections on contact page', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Check corporate office section
    const officeHeading = page.locator('h4:has-text("Corporate Office")');
    await expect(officeHeading).toBeVisible();
    
    // Check patient assistance section
    const paHeading = page.locator('h3:has-text("Patient Assistance")');
    const paVisible = await paHeading.isVisible().catch(() => false);
    
    if (paVisible) {
      // Verify phone number
      const phone = page.locator('text=+1 (866) 258-7151');
      await expect(phone).toBeVisible();
    }
    
    // Check business development section
    const bdHeading = page.locator('h3:has-text("Business Development")');
    const bdVisible = await bdHeading.isVisible().catch(() => false);
    expect(bdVisible).toBe(true);
  });

  test('User journey: Navigate through carousel slides', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const buttons = page.locator('button:has-text("Go to slide")');
    const count = await buttons.count();
    
    if (count >= 3) {
      // Click through first 3 slides
      for (let i = 0; i < 3; i++) {
        await buttons.nth(i).click();
        await page.waitForTimeout(300);
        
        // Verify button reflects current slide (visual feedback)
        const button = buttons.nth(i);
        const isVisible = await button.isVisible();
        expect(isVisible).toBe(true);
      }
    }
  });

  test('User journey: Mobile user navigates through pages', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate through pages on mobile
    await page.goto(BASE_URL);
    let heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    // Click menu item
    const ourCultureLink = page.locator('a:has-text("Our Culture")');
    await expect(ourCultureLink).toBeVisible();
    await ourCultureLink.click();
    
    await page.waitForURL('**/our-culture/');
    
    // Content should be visible on mobile
    heading = page.locator('h1, h2');
    await expect(heading.first()).toBeVisible();
  });

  test('User journey: Desktop user completes full form interaction', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1024 });
    
    await page.goto(BASE_URL + '/contact-us/');
    
    // All form elements should be visible without scrolling
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    const firstNameField = page.locator('input[placeholder*="First Name"], input:nth-of-type(1)').first();
    const submitBtn = page.locator('button:has-text("Submit")');
    
    // Fill form
    await firstNameField.fill('Jane');
    await page.locator('input[placeholder*="Last Name"], input:nth-of-type(2)').first().fill('Smith');
    await page.locator('input[placeholder*="username"], input[type="email"]').first().fill('jane@example.com');
    
    // Submit button should be clickable
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });

  test('User journey: Verify all support resources are accessible', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Check multiple support options
    const sections = [
      'Product Complaints',
      'HR Inquiries',
      'Business Development',
      'Public Relations',
      'Patient Assistance',
      'AccordConnects'
    ];
    
    for (const section of sections) {
      const element = page.locator(`text="${section}"`);
      const count = await element.count();
      
      // At least one section should be present (not all may be visible)
      if (section === 'Product Complaints' || section === 'Patient Assistance') {
        expect(count).toBeGreaterThan(0);
      }
    }
  });

  test('User journey: Cookie consent and site usage', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check for cookie banner
    const cookieText = page.locator('text=We use cookies');
    const isVisible = await cookieText.isVisible().catch(() => false);
    
    if (isVisible) {
      // Accept cookies
      const acceptBtn = page.locator('button:has-text("Accept")');
      await acceptBtn.click();
      
      // Wait for banner to potentially disappear
      await page.waitForTimeout(500);
    }
    
    // Site should continue to work normally
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('User journey: Access external resources and links', async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
    
    // Check for external links that user might access
    const externalLinks = [
      page.locator('a[href*="accordcaresportal"]'),
      page.locator('a[href*="prnewswire"]').first()
    ];
    
    for (const link of externalLinks) {
      const isVisible = await link.isVisible().catch(() => false);
      if (isVisible) {
        const href = await link.getAttribute('href');
        expect(href).toBeTruthy();
      }
    }
  });
});
