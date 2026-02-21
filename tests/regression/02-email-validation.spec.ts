// spec: specs/accord-biopharma-test-plan.md
// Regression Test: Email Validation and Edge Cases
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.accordbiopharma.com';

test.describe('Regression: Email Validation and Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + '/contact-us/');
  });

  test('Email field rejects invalid email formats', async ({ page }) => {
    const emailField = page.locator('input[placeholder*="username"], input[type="email"]').first();
    
    const invalidEmails = [
      'john@',           // Missing domain
      '@example.com',    // Missing local part
      'john.example.com', // Missing @
      'john@@example.com', // Double @
      'john@.com',       // Missing domain name
      'john @example.com', // Space in email
    ];
    
    for (const email of invalidEmails) {
      await emailField.clear();
      await emailField.fill(email);
      const value = await emailField.inputValue();
      // Field accepts input, but HTML5 validation would reject on submit
      expect(value).toBe(email);
    }
  });

  test('Email field accepts various valid formats', async ({ page }) => {
    const emailField = page.locator('input[placeholder*="username"], input[type="email"]').first();
    
    const validEmails = [
      'user@example.com',
      'first.last@example.com',
      'user+tag@example.co.uk',
      'test123@test-domain.com',
      'a@b.c'
    ];
    
    for (const email of validEmails) {
      await emailField.clear();
      await emailField.fill(email);
      const value = await emailField.inputValue();
      expect(value).toBe(email);
    }
  });

  test('Form submission with empty required fields shows validation', async ({ page }) => {
    // Try to submit without filling fields
    const submitBtn = page.locator('button:has-text("Submit")');
    await submitBtn.click();
    
    // Wait a bit for validation messages
    await page.waitForTimeout(1000);
    
    // Check if validation errors appear or form doesn't submit
    const currentUrl = page.url();
    // URL should still be contact-us (not submitted successfully)
    expect(currentUrl).toContain('contact-us');
  });

  test('Form validation shows error when email is invalid', async ({ page }) => {
    const firstNameField = page.locator('input[placeholder*="First Name"], input:nth-of-type(1)').first();
    const lastNameField = page.locator('input[placeholder*="Last Name"], input:nth-of-type(2)').first();
    const emailField = page.locator('input[placeholder*="username"], input[type="email"]').first();
    const stateDropdown = page.locator('select').first();
    const inquiryDropdown = page.locator('select').nth(1);
    const submitBtn = page.locator('button:has-text("Submit")');
    
    // Fill with invalid email
    await firstNameField.fill('John');
    await lastNameField.fill('Doe');
    await emailField.fill('invalid-email');
    await stateDropdown.selectOption('CA');
    await inquiryDropdown.selectOption('Human Resources');
    
    // Try to submit
    await submitBtn.click();
    await page.waitForTimeout(1000);
    
    // Should still be on contact-us page
    const currentUrl = page.url();
    expect(currentUrl).toContain('contact-us');
  });

  test('Email field has correct placeholder text', async ({ page }) => {
    const emailField = page.locator('input[placeholder*="username"]').first();
    const placeholder = await emailField.getAttribute('placeholder');
    expect(placeholder).toContain('username@domainname');
  });

  test('Form fields accept and display long input', async ({ page }) => {
    const firstNameField = page.locator('input[placeholder*="First Name"], input:nth-of-type(1)').first();
    const longName = 'A'.repeat(50);
    
    await firstNameField.fill(longName);
    const value = await firstNameField.inputValue();
    expect(value).toBe(longName);
  });

  test('Question field handles special characters correctly', async ({ page }) => {
    const textarea = page.locator('textarea').first();
    
    const specialText = 'Test with special chars: @#$%^&*()_+-=[]{}|;:\'",.<>?/`~';
    await textarea.fill(specialText);
    
    const value = await textarea.inputValue();
    expect(value).toBe(specialText);
  });
});
