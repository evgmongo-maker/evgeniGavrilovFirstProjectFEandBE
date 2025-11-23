import { test, expect } from '@playwright/test';

/**
 * Calculator E2E Tests
 * Modern TypeScript implementation with best practices
 * 
 * Tests the mortgage calculator flow:
 * 1. Navigate to home page
 * 2. Click on calculator button
 * 3. Verify calculator page loads with correct content
 */

// Constants
const CLIENT_URL = 'http://localhost:5173';
const CALCULATOR_PAGE_TITLE = 'מחשבון הלוואה לנכסים';
const CALCULATOR_BUTTON_TEXT = 'מחשבון משכנתא';
const TIMEOUT = 5000;

test.describe('Mortgage Calculator E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to home page before each test
    await page.goto(`${CLIENT_URL}/home`);
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to calculator page when clicking calculator button', async ({ page }) => {
    // Arrange: Wait for calculator button to be visible
    const calculatorButton = page.getByRole('link', { name: CALCULATOR_BUTTON_TEXT }).first();
    await expect(calculatorButton).toBeVisible({ timeout: TIMEOUT });

    // Act: Click on calculator button
    await calculatorButton.click();

    // Assert: Verify navigation to calculator page
    await expect(page).toHaveURL(/.*\/calculator/, { timeout: TIMEOUT });
    
    // Assert: Verify calculator title is visible
    const calculatorTitle = page.getByText(CALCULATOR_PAGE_TITLE);
    await expect(calculatorTitle).toBeVisible({ timeout: TIMEOUT });
  });

  test('should navigate to calculator from navigation menu', async ({ page }) => {
    // Arrange: Find calculator link in navigation
    const navCalculatorLink = page.locator('nav').getByRole('link', { name: CALCULATOR_BUTTON_TEXT });
    await expect(navCalculatorLink).toBeVisible({ timeout: TIMEOUT });

    // Act: Click on navigation link
    await navCalculatorLink.click();

    // Assert: Verify navigation to calculator page
    await expect(page).toHaveURL(/.*\/calculator/, { timeout: TIMEOUT });
    
    // Assert: Verify calculator content is displayed
    await expect(page.getByText(CALCULATOR_PAGE_TITLE)).toBeVisible({ timeout: TIMEOUT });
  });

  test('should display calculator form elements', async ({ page }) => {
    // Arrange: Navigate to calculator page
    await page.goto(`${CLIENT_URL}/calculator`);
    await page.waitForLoadState('networkidle');

    // Assert: Verify calculator title
    await expect(page.getByText(CALCULATOR_PAGE_TITLE)).toBeVisible();

    // Assert: Verify form inputs are present using placeholders and labels
    const loanAmountInput = page.getByPlaceholder(/לדוגמה: 1000000/i);
    const interestRateInput = page.getByPlaceholder(/לדוגמה: 3.5/i);
    const yearsInput = page.getByPlaceholder(/לדוגמה: 25/i);
    const calculateButton = page.getByRole('button', { name: /חשב הלוואה/i });

    await expect(loanAmountInput).toBeVisible();
    await expect(interestRateInput).toBeVisible();
    await expect(yearsInput).toBeVisible();
    await expect(calculateButton).toBeVisible();
  });
});

