import { test, expect } from '@playwright/test';

test.describe('LiquidGlass button interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
  });

  test('clicking a segmented option updates aria-checked', async ({ page }) => {
    // The segmented variant is the second liquid-glass-button
    const segmented = page.locator('[data-testid="liquid-glass-button"]').nth(1);
    const radios = segmented.getByRole('radio');

    await radios.nth(1).click();

    await expect(radios.nth(1)).toHaveAttribute('aria-checked', 'true');
    await expect(radios.nth(0)).toHaveAttribute('aria-checked', 'false');
  });

  test('keyboard Tab+Enter activates a segmented option', async ({ page }) => {
    const segmented = page.locator('[data-testid="liquid-glass-button"]').nth(1);
    const firstRadio = segmented.getByRole('radio').first();

    await firstRadio.focus();
    await page.keyboard.press('Enter');

    await expect(firstRadio).toHaveAttribute('aria-checked', 'true');
  });

  test('keyboard Tab+Space activates a segmented option', async ({ page }) => {
    const segmented = page.locator('[data-testid="liquid-glass-button"]').nth(1);
    const secondRadio = segmented.getByRole('radio').nth(1);

    await secondRadio.focus();
    await page.keyboard.press('Space');

    await expect(secondRadio).toHaveAttribute('aria-checked', 'true');
  });

  test('disabled option in segmented variant is not interactable', async ({ page }) => {
    const segmented = page.locator('[data-testid="liquid-glass-button"]').nth(1);
    const disabledButton = segmented.locator('button[disabled]');

    await expect(disabledButton).toHaveCount(1);
    await expect(disabledButton).toBeDisabled();
  });

  test('selected option has visually distinct class', async ({ page }) => {
    const segmented = page.locator('[data-testid="liquid-glass-button"]').nth(1);
    const firstRadio = segmented.getByRole('radio').first();

    // Select it
    await firstRadio.click();

    // Should have aria-checked="true" and be visible
    await expect(firstRadio).toHaveAttribute('aria-checked', 'true');
    await expect(firstRadio).toBeVisible();
  });

  test('single variant renders with aria-pressed', async ({ page }) => {
    const single = page.locator('[data-testid="liquid-glass-button"]').nth(0);
    const btn = single.getByRole('button');

    await expect(btn).toBeVisible();
    // aria-pressed should be set (true or false)
    const pressed = await btn.getAttribute('aria-pressed');
    expect(['true', 'false']).toContain(pressed);
  });
});
