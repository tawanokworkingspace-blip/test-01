import { test, expect } from '@playwright/test';

test.describe('Components page', () => {
  test('loads successfully and shows a heading', async ({ page }) => {
    const response = await page.goto('/components');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading')).toBeVisible();
  });

  test('has showcase sections for each component type', async ({ page }) => {
    await page.goto('/components');
    const sections = page.locator('[data-testid="showcase-section"]');
    await expect(sections).toHaveCount(3);
  });

  test('renders both LiquidGlass button variants', async ({ page }) => {
    await page.goto('/components');
    const lgButtons = page.locator('[data-testid="liquid-glass-button"]');
    await expect(lgButtons).toHaveCount(2);
  });

  test('is navigable via a next/link from the home page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /components/i }).click();
    await expect(page).toHaveURL('/components');
  });
});
