import { test, expect } from '@playwright/test';

test('דוגמה לבדיקה', async ({ page }) => {
  // דוגמה לבדיקה בסיסית
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});


