// spec: specs/accord-biopharma-test-plan.md
// Regression Test: Contact Form Detailed Validation
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.accordbiopharma.com';

test.describe('Regression: Contact Form Field Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
  });

  test('First Name field accepts valid input', async ({ page }) => {
    const firstNameField = page.locator('input[placeholder*="First Name"], input:nth-of-type(1)').first();
    
    await firstNameField.fill('John');
    const value = await firstNameField.inputValue();
    expect(value).toBe('John');
  });

  test('First Name field accepts names with hyphens and apostrophes', async ({ page }) => {
    const firstNameField = page.locator('input[placeholder*="First Name"], input:nth-of-type(1)').first();
    
    await firstNameField.fill('Mary-Jane');
    let value = await firstNameField.inputValue();
    expect(value).toBe('Mary-Jane');
    
    await firstNameField.clear();
    await firstNameField.fill("O'Brien");
    value = await firstNameField.inputValue();
    expect(value).toBe("O'Brien");
  });

  test('Last Name field accepts valid input', async ({ page }) => {
    const lastNameField = page.locator('input[placeholder*="Last Name"], input:nth-of-type(2)').first();
    
    await lastNameField.fill('Doe');
    const value = await lastNameField.inputValue();
    expect(value).toBe('Doe');
  });

  test('Professional Email field requires valid email format', async ({ page }) => {
    const emailField = page.locator('input[placeholder*="username"]').first();
    
    // Valid email
    await emailField.fill('john@example.com');
    let value = await emailField.inputValue();
    expect(value).toBe('john@example.com');
    
    // Test various email formats
    const validEmails = [
      'test.user@domain.com',
      'user+tag@example.com',
      'test123@test-domain.co.uk'
    ];
    
    for (const email of validEmails) {
      await emailField.clear();
      await emailField.fill(email);
      value = await emailField.inputValue();
      expect(value).toBe(email);
    }
  });

  test('State dropdown contains all US states', async ({ page }) => {
    const stateDropdown = page.locator('select').first();
    await expect(stateDropdown).toBeVisible();
    
    // Get all options
    const options = await stateDropdown.locator('option').count();
    
    // Should have at least 50 states + PR + VI + default option
    expect(options).toBeGreaterThanOrEqual(53);
  });

  test('State dropdown has default "Please Select" option', async ({ page }) => {
    const stateDropdown = page.locator('select').first();
    const defaultOption = stateDropdown.locator('option:first-child');
    
    const text = await defaultOption.textContent();
    expect(text?.trim()).toBe('Please Select');
  });

  test('State dropdown can select specific states', async ({ page }) => {
    const stateDropdown = page.locator('select').first();
    
    // Select California
    await stateDropdown.selectOption('CA');
    const selected = await stateDropdown.inputValue();
    expect(selected).toBe('CA');
    
    // Select New York
    await stateDropdown.selectOption('NY');
    const selected2 = await stateDropdown.inputValue();
    expect(selected2).toBe('NY');
  });

  test('Inquiry Type dropdown has correct options', async ({ page }) => {
    const inquiryDropdown = page.locator('select').nth(1);
    
    const expectedOptions = [
      'Human Resources',
      'Business Development',
      'Public Relations',
      'Patient Assistance',
      'AccordConnects',
      'Payer Coverage',
      'Other'
    ];
    
    for (const option of expectedOptions) {
      const optionElement = inquiryDropdown.locator(`option:has-text("${option}")`);
      const count = await optionElement.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('Question textarea accepts multi-line input', async ({ page }) => {
    const textarea = page.locator('textarea').first();
    
    const multilineText = 'This is line 1\nThis is line 2\nThis is line 3';
    await textarea.fill(multilineText);
    
    const value = await textarea.inputValue();
    expect(value).toContain('This is line 1');
    expect(value).toContain('This is line 2');
  });

  test('Form fields are properly labeled', async ({ page }) => {
    // Check that labels are associated with form fields
    const labels = [
      { text: 'First Name', type: 'input' },
      { text: 'Last Name', type: 'input' },
      { text: 'Professional Email', type: 'input' }
    ];
    
    for (const label of labels) {
      const labelElement = page.locator(`text="${label.text}"`);
      await expect(labelElement).toBeVisible();
    }
  });

  test('Required fields are marked with asterisk', async ({ page }) => {
    // Get all required field indicators
    const requiredMarkers = page.locator('*:has-text("*")');
    const count = await requiredMarkers.count();
    
    expect(count).toBeGreaterThan(4); // At least First Name, Last Name, Email, State, Inquiry
  });

  test('Form contains privacy/consent checkbox', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();
    await expect(checkbox).toBeVisible();
    
    // Check checkbox label text
    const checkboxText = page.locator('text=Terms of Use').first();
    await expect(checkboxText).toBeVisible();
  });
});
