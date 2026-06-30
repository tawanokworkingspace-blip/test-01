/**
 * E2E tests for the /components showcase route
 * AC11 — /components returns 200; renders "Components" heading; one labeled showcase-item
 *         per showcased component including both single and segmented Liquid Glass variants
 * AC12 — responsive layout: each example in a labeled, isolated showcase-item container
 * AC13 — home page "/" exposes a link that navigates to /components
 * AC6  — keyboard focus reaches a button on the /components page
 * AC7  — clicking a segment in the segmented button updates aria-pressed (interactive live demo)
 */

import { test, expect } from '@playwright/test'

// ---------------------------------------------------------------------------
// AC11 — route reachable, heading present, showcase content present
// ---------------------------------------------------------------------------
test.describe('/components showcase page', () => {
  test('AC11: returns HTTP 200 and renders the Components heading', async ({ page }) => {
    const response = await page.goto('/components')
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible()
  })

  test('AC11: root container carries data-testid="components-showcase"', async ({ page }) => {
    await page.goto('/components')
    await expect(page.getByTestId('components-showcase')).toBeVisible()
  })

  test('AC11: renders at least one showcase-item container', async ({ page }) => {
    await page.goto('/components')
    const items = page.getByTestId('showcase-item')
    await expect(items.first()).toBeVisible()
    expect(await items.count()).toBeGreaterThanOrEqual(1)
  })

  test('AC11: includes at least one single LiquidGlassButton example', async ({ page }) => {
    await page.goto('/components')
    await expect(page.getByTestId('liquid-glass-button').first()).toBeVisible()
  })

  test('AC11: includes a LiquidGlassSegmentedButton example', async ({ page }) => {
    await page.goto('/components')
    await expect(page.getByTestId('liquid-glass-segmented').first()).toBeVisible()
  })
})

// ---------------------------------------------------------------------------
// AC12 — each showcase-item has a visible label heading
// ---------------------------------------------------------------------------
test.describe('AC12: responsive layout and labeled isolated examples', () => {
  test('every showcase-item contains a visible heading/label', async ({ page }) => {
    await page.goto('/components')
    const items = page.getByTestId('showcase-item')
    const count = await items.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const heading = items.nth(i).locator('h2, h3, h4').first()
      await expect(heading).toBeVisible()
    }
  })

  test('showcase renders correctly on a narrow (mobile) viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/components')
    await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible()
    await expect(page.getByTestId('showcase-item').first()).toBeVisible()
  })

  test('showcase renders correctly on a wide (desktop) viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/components')
    await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible()
    await expect(page.getByTestId('liquid-glass-segmented').first()).toBeVisible()
  })
})

// ---------------------------------------------------------------------------
// AC13 — home page "/" links to /components
// ---------------------------------------------------------------------------
test.describe('AC13: navigation from home to /components', () => {
  test('home page has a visible link to the /components route', async ({ page }) => {
    await page.goto('/')
    const link = page.getByRole('link', { name: /components/i })
    await expect(link).toBeVisible()
  })

  test('following the /components link from home navigates correctly', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /components/i }).click()
    await expect(page).toHaveURL(/\/components$/)
    await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible()
  })
})

// ---------------------------------------------------------------------------
// AC6 — keyboard focus reaches a button on /components
// ---------------------------------------------------------------------------
test.describe('AC6: keyboard accessibility on /components page', () => {
  test('Tab key reaches a focusable button on the /components page', async ({ page }) => {
    await page.goto('/components')
    await page.keyboard.press('Tab')
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName ?? '')
    expect(['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(focusedTag)
  })
})

// ---------------------------------------------------------------------------
// AC7 — segmented button is interactive: clicking a segment updates aria-pressed
// ---------------------------------------------------------------------------
test.describe('AC7: segmented button interactive selection on /components page', () => {
  test('clicking a non-selected segment changes its aria-pressed to "true"', async ({ page }) => {
    await page.goto('/components')
    const segmented = page.getByTestId('liquid-glass-segmented').first()
    await expect(segmented).toBeVisible()

    const buttons = segmented.getByRole('button')
    const count = await buttons.count()
    expect(count).toBeGreaterThan(1)

    // Find the first button that is NOT already selected
    let targetIndex = -1
    for (let i = 0; i < count; i++) {
      const pressed = await buttons.nth(i).getAttribute('aria-pressed')
      if (pressed === 'false') {
        targetIndex = i
        break
      }
    }
    expect(targetIndex).toBeGreaterThanOrEqual(0)

    const target = buttons.nth(targetIndex)
    await target.click()
    await expect(target).toHaveAttribute('aria-pressed', 'true')
  })

  test('after clicking a segment the previously-selected segment loses aria-pressed="true"', async ({ page }) => {
    await page.goto('/components')
    const segmented = page.getByTestId('liquid-glass-segmented').first()
    const buttons = segmented.getByRole('button')

    // Find the currently selected and a non-selected button
    const count = await buttons.count()
    let selectedIndex = -1
    let unselectedIndex = -1
    for (let i = 0; i < count; i++) {
      const pressed = await buttons.nth(i).getAttribute('aria-pressed')
      if (pressed === 'true' && selectedIndex === -1) selectedIndex = i
      if (pressed === 'false' && unselectedIndex === -1) unselectedIndex = i
    }
    expect(selectedIndex).toBeGreaterThanOrEqual(0)
    expect(unselectedIndex).toBeGreaterThanOrEqual(0)

    await buttons.nth(unselectedIndex).click()
    await expect(buttons.nth(selectedIndex)).toHaveAttribute('aria-pressed', 'false')
  })
})
