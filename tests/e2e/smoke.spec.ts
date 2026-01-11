import { test, expect } from '@playwright/test';

test('should render the landing page', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page).toHaveTitle(/Task List/i);

  const mainHeading = page.getByRole('heading', { level: 1 });
  await expect(mainHeading).toBeVisible();
});