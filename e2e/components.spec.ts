import { test, expect } from '@playwright/test';

test.describe('/components page', () => {
  test('navigate from home link reaches /components', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/components"]');
    await page.waitForURL('**/components');
    expect(page.url()).toContain('/components');
  });

  test('/components returns 200 and renders h1 "Components"', async ({ page }) => {
    const response = await page.goto('/components');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText('Components');
  });

  test('single and segmented example sections are visible', async ({ page }) => {
    await page.goto('/components');
    await expect(
      page.locator('section').filter({ hasText: 'Liquid Glass Button — Single' }),
    ).toBeVisible();
    await expect(
      page.locator('section').filter({ hasText: 'Liquid Glass Button — Segmented' }),
    ).toBeVisible();
  });

  test('clicking a segmented option flips aria-pressed to true', async ({ page }) => {
    await page.goto('/components');
    // Initial state: 'command' is selected; 'Inbox' is not
    const inboxButton = page.getByRole('button', { name: 'Inbox' }).first();
    await expect(inboxButton).toHaveAttribute('aria-pressed', 'false');
    await inboxButton.click();
    await expect(inboxButton).toHaveAttribute('aria-pressed', 'true');
  });

  test('no horizontal overflow at 375px viewport width', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/components');
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth,
    );
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });

  test('captures screenshot artifact', async ({ page }) => {
    await page.goto('/components');
    await page.screenshot({
      path: 'test-results/components-page.png',
      fullPage: true,
    });
  });
});
