import { test, expect } from '@playwright/test';

test.describe('/components page', () => {
  test('returns 200 and shows Components heading', async ({ page }) => {
    const response = await page.goto('/components');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible();
  });

  test('contains both single and segmented Liquid Glass examples', async ({ page }) => {
    await page.goto('/components');
    const items = page.locator('[data-testid="showcase-item"]');
    await expect(items).toHaveCount(7);

    await expect(page.locator('[data-testid="liquid-glass-button"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="liquid-glass-segmented"]').first()).toBeVisible();
  });

  test('segmented button selection updates aria-pressed', async ({ page }) => {
    await page.goto('/components');
    const commandSeg = page.locator('[data-testid="lgb-seg-command"]').first();
    const inboxSeg = page.locator('[data-testid="lgb-seg-inbox"]').first();

    await expect(commandSeg).toHaveAttribute('aria-pressed', 'true');
    await expect(inboxSeg).toHaveAttribute('aria-pressed', 'false');

    await inboxSeg.click();

    await expect(commandSeg).toHaveAttribute('aria-pressed', 'false');
    await expect(inboxSeg).toHaveAttribute('aria-pressed', 'true');
  });

  test('keyboard focus can reach a button', async ({ page }) => {
    await page.goto('/components');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON']).toContain(focused);
  });

  test('home page has a link to /components', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: /components/i });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/components/);
  });
});
