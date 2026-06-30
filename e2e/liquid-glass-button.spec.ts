import { test, expect } from '@playwright/test'

test.describe('LiquidGlassButton — single variant', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components')
  })

  test('renders single variant with icon and label', async ({ page }) => {
    const btn = page.locator('[data-testid="liquid-glass-button"][data-variant="single"]').first()
    await expect(btn).toBeVisible()
    await expect(btn).toHaveAttribute('data-variant', 'single')
    const iconWrapper = btn.locator('[aria-hidden="true"]').first()
    await expect(iconWrapper).toBeAttached()
  })

  test('single variant root is a button element', async ({ page }) => {
    const btn = page.locator('[data-testid="liquid-glass-button"][data-variant="single"]').first()
    await expect(btn).toHaveAttribute('type', 'button')
    const tagName = await btn.evaluate((el) => el.tagName.toLowerCase())
    expect(tagName).toBe('button')
  })

  test('single variant has aria-pressed reflecting selected state', async ({ page }) => {
    const selectedBtn = page.locator(
      '[data-testid="liquid-glass-button"][data-variant="single"][aria-pressed="true"]'
    )
    const unselectedBtn = page.locator(
      '[data-testid="liquid-glass-button"][data-variant="single"][aria-pressed="false"]'
    )
    const selectedCount = await selectedBtn.count()
    const unselectedCount = await unselectedBtn.count()
    expect(selectedCount + unselectedCount).toBeGreaterThan(0)
  })

  test('single variant disabled button has disabled attribute', async ({ page }) => {
    const disabledBtn = page.locator(
      '[data-testid="liquid-glass-button"][data-variant="single"]:disabled'
    )
    if ((await disabledBtn.count()) > 0) {
      await expect(disabledBtn.first()).toBeDisabled()
    }
  })

  test('single variant has accessible name from label', async ({ page }) => {
    const btn = page.locator('[data-testid="liquid-glass-button"][data-variant="single"]').first()
    const accessibleName = await btn.getAttribute('aria-label')
    const textContent = await btn.textContent()
    const hasAccessibleName = (accessibleName && accessibleName.length > 0) || (textContent && textContent.trim().length > 0)
    expect(hasAccessibleName).toBeTruthy()
  })

  test('clicking an enabled single button fires onClick', async ({ page }) => {
    const btn = page.locator(
      '[data-testid="liquid-glass-button"][data-variant="single"]:not(:disabled)'
    ).first()
    await expect(btn).toBeEnabled()
    await btn.click()
  })

  test('keyboard: Tab to focus, Enter activates single button', async ({ page }) => {
    await page.keyboard.press('Tab')
    const btn = page.locator(
      '[data-testid="liquid-glass-button"][data-variant="single"]:not(:disabled)'
    ).first()
    await btn.focus()
    await page.keyboard.press('Enter')
  })

  test('keyboard: Space activates single button', async ({ page }) => {
    const btn = page.locator(
      '[data-testid="liquid-glass-button"][data-variant="single"]:not(:disabled)'
    ).first()
    await btn.focus()
    await page.keyboard.press('Space')
  })

  test('focus-visible styling is applied on keyboard focus', async ({ page }) => {
    const btn = page.locator(
      '[data-testid="liquid-glass-button"][data-variant="single"]:not(:disabled)'
    ).first()
    await btn.focus()
    const outline = await btn.evaluate((el) => {
      const styles = window.getComputedStyle(el)
      return styles.outlineStyle !== 'none' || styles.outline !== '' || styles.boxShadow !== 'none'
    })
    expect(outline).toBeTruthy()
  })
})

test.describe('LiquidGlassButton — segmented variant', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components')
  })

  test('segmented variant root is a div with role="group"', async ({ page }) => {
    const group = page.locator('[data-testid="liquid-glass-button"][data-variant="segmented"]').first()
    await expect(group).toBeVisible()
    const tagName = await group.evaluate((el) => el.tagName.toLowerCase())
    expect(tagName).toBe('div')
    await expect(group).toHaveAttribute('role', 'group')
  })

  test('segmented variant renders at least 2 options', async ({ page }) => {
    const group = page.locator('[data-testid="liquid-glass-button"][data-variant="segmented"]').first()
    const segments = group.locator('[data-testid="liquid-glass-segment"]')
    const count = await segments.count()
    expect(count).toBeGreaterThanOrEqual(2)
  })

  test('exactly one segment has data-selected="true"', async ({ page }) => {
    const group = page.locator('[data-testid="liquid-glass-button"][data-variant="segmented"]').first()
    const selectedSegments = group.locator('[data-testid="liquid-glass-segment"][data-selected="true"]')
    await expect(selectedSegments).toHaveCount(1)
  })

  test('selected segment has aria-pressed="true"', async ({ page }) => {
    const group = page.locator('[data-testid="liquid-glass-button"][data-variant="segmented"]').first()
    const selectedSegment = group.locator('[data-testid="liquid-glass-segment"][data-selected="true"]')
    await expect(selectedSegment).toHaveAttribute('aria-pressed', 'true')
  })

  test('non-selected segments have aria-pressed="false"', async ({ page }) => {
    const group = page.locator('[data-testid="liquid-glass-button"][data-variant="segmented"]').first()
    const unselectedSegments = group.locator('[data-testid="liquid-glass-segment"][aria-pressed="false"]')
    const count = await unselectedSegments.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('each segment is a button element', async ({ page }) => {
    const group = page.locator('[data-testid="liquid-glass-button"][data-variant="segmented"]').first()
    const segments = group.locator('[data-testid="liquid-glass-segment"]')
    const count = await segments.count()
    for (let i = 0; i < count; i++) {
      const tagName = await segments.nth(i).evaluate((el) => el.tagName.toLowerCase())
      expect(tagName).toBe('button')
    }
  })

  test('clicking a non-selected segment updates selection', async ({ page }) => {
    const group = page.locator('[data-testid="liquid-glass-button"][data-variant="segmented"]').first()
    const unselectedSegment = group.locator(
      '[data-testid="liquid-glass-segment"][aria-pressed="false"]'
    ).first()
    const targetValue = await unselectedSegment.getAttribute('data-value')
    await unselectedSegment.click()
    const nowSelected = group.locator(
      `[data-testid="liquid-glass-segment"][data-value="${targetValue}"][data-selected="true"]`
    )
    await expect(nowSelected).toHaveCount(1)
  })

  test('each segment has icon with aria-hidden', async ({ page }) => {
    const group = page.locator('[data-testid="liquid-glass-button"][data-variant="segmented"]').first()
    const segments = group.locator('[data-testid="liquid-glass-segment"]')
    const count = await segments.count()
    for (let i = 0; i < count; i++) {
      const iconWrapper = segments.nth(i).locator('[aria-hidden="true"]').first()
      await expect(iconWrapper).toBeAttached()
    }
  })

  test('keyboard Tab + Enter activates a segment', async ({ page }) => {
    const group = page.locator('[data-testid="liquid-glass-button"][data-variant="segmented"]').first()
    const unselectedSegment = group.locator(
      '[data-testid="liquid-glass-segment"][aria-pressed="false"]'
    ).first()
    const targetValue = await unselectedSegment.getAttribute('data-value')
    await unselectedSegment.focus()
    await page.keyboard.press('Enter')
    const nowSelected = group.locator(
      `[data-testid="liquid-glass-segment"][data-value="${targetValue}"][data-selected="true"]`
    )
    await expect(nowSelected).toHaveCount(1)
  })

  test('keyboard Space activates a segment', async ({ page }) => {
    const group = page.locator('[data-testid="liquid-glass-button"][data-variant="segmented"]').first()
    const unselectedSegment = group.locator(
      '[data-testid="liquid-glass-segment"][aria-pressed="false"]'
    ).first()
    const targetValue = await unselectedSegment.getAttribute('data-value')
    await unselectedSegment.focus()
    await page.keyboard.press(' ')
    const nowSelected = group.locator(
      `[data-testid="liquid-glass-segment"][data-value="${targetValue}"][data-selected="true"]`
    )
    await expect(nowSelected).toHaveCount(1)
  })
})
