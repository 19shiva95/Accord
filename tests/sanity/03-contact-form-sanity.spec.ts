// spec: specs/accord-biopharma-test-plan.md
// Sanity Test: Contact Form - Critical Functionality
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.accordbiopharma.com';

test.describe('Sanity: Contact Form - Page Load and Basic Structure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
  });

  test('Contact page loads with correct title', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle('Contact Us - Accord BioPharma');
  });

  test('Contact form is visible on page', async ({ page }) => {
    // Check contact form exists
    const contactForm = page.locator('form');
    await expect(contactForm).toBeVisible();
  });

  test('Corporate office information is displayed', async ({ page }) => {
    // Check office heading
    const officeHeading = page.locator('h4:has-text("Corporate Office")');
    await expect(officeHeading).toBeVisible();
    
    // Check address is visible
    const address = page.locator('text=8041 Arco Corporate Drive');
    await expect(address).toBeVisible();
    
    // Check phone number
    const phone = page.locator('a[href*="tel:+1919"]');
    await expect(phone).toBeVisible();
  });

  test('All required form fields are present', async ({ page }) => {
    // First Name field
    const firstName = page.locator('textbox[placeholder*="First"]');
    await expect(firstName).toBeVisible();
    
    // Last Name field
    const lastName = page.locator('textbox[placeholder*="Last"]');
    await expect(lastName).toBeVisible();
    
    // Email field
    const email = page.locator('textbox[placeholder*="username"]');
    await expect(email).toBeVisible();
    
    // State dropdown
    const state = page.locator('select');
    await expect(state).toBeVisible();
    
    // Question textarea
    const textarea = page.locator('textarea');
    await expect(textarea).toBeVisible();
  });

  test('Submit button is visible and enabled', async ({ page }) => {
    // Check submit button
    const submitBtn = page.locator('button:has-text("Submit")');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });

  test('Form contains correct labels for all fields', async ({ page }) => {
    // Check for label text
    const labels = [
      'First Name',
      'Last Name',
      'Professional Email',
      'State',
      'I would Like to Inquire About',
      'Please Provide Your Question Below'
    ];

    for (const label of labels) {
      const labelElement = page.locator(`text="${label}"`);
      await expect(labelElement).toBeVisible();
    }
  });

  test('Form contains required field indicators', async ({ page }) => {
    // Check for asterisk in required fields
    const requiredIndicators = page.locator('text=*');
    const count = await requiredIndicators.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Cookie banner is visible on contact page', async ({ page }) => {
    // Check cookie banner
    const cookieBanner = page.locator('text=We use cookies on our website');
    await expect(cookieBanner).toBeVisible();
    
    // Check Accept button
    const acceptBtn = page.locator('button:has-text("Accept")');
    await expect(acceptBtn).toBeVisible();
  });
});
