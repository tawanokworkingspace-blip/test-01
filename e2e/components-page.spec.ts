import { test, expect } from '@playwright/test'

test.describe('/components page', () => {
  test('returns 200 at /components', async ({ page }) => {
    const response = await page.goto('/components')
    expect(response?.status()).toBe(200)
  })

  test('page contains single variant LiquidGlassButton', async ({ page }) => {
    await page.goto('/components')
    const singleBtn = page.locator('[data-testid="liquid-glass-button"][data-variant="single"]')
    await expect(singleBtn.first()).toBeVisible()
  })

  test('page contains segmented variant LiquidGlassButton', async ({ page }) => {
    await page.goto('/components')
    const segmentedBtn = page.locator('[data-testid="liquid-glass-button"][data-variant="segmented"]')
    await expect(segmentedBtn.first()).toBeVisible()
  })

  test('every component-example section has a visible heading', async ({ page }) => {
    await page.goto('/components')
    const sections = page.locator('[data-testid="component-example"]')
    const count = await sections.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const heading = sections.nth(i).locator('h2, h3, h4, h5, h6')
      const headingCount = await heading.count()
      expect(headingCount).toBeGreaterThan(0)
      await expect(heading.first()).toBeVisible()
    }
  })

  test('no horizontal overflow at 375px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/components')
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
    const clientWidth = await page.evaluate(() => document.body.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })

  test('no horizontal overflow at 1280px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/components')
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
    const clientWidth = await page.evaluate(() => document.body.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })

  test('home page has nav link to /components', async ({ page }) => {
    await page.goto('/')
    const link = page.locator('a[href="/components"]')
    await expect(link.first()).toBeVisible()
    const text = await link.first().textContent()
    expect(text?.toLowerCase()).toContain('components')
  })

  test('nav link from home navigates to /components', async ({ page }) => {
    await page.goto('/')
    const link = page.locator('a[href="/components"]').first()
    await link.click()
    await expect(page).toHaveURL(/\/components/)
    await expect(page).toHaveTitle(/Components/i)
  })

  test('showcase has responsive grid layout', async ({ page }) => {
    await page.goto('/components')

    await page.setViewportSize({ width: 1280, height: 800 })
    const wideLayout = await page.evaluate(() => {
      const grid = document.querySelector('[data-testid="showcase-grid"]')
      if (!grid) return null
      return window.getComputedStyle(grid).gridTemplateColumns
    })

    await page.setViewportSize({ width: 375, height: 812 })
    const narrowLayout = await page.evaluate(() => {
      const grid = document.querySelector('[data-testid="showcase-grid"]')
      if (!grid) return null
      return window.getComputedStyle(grid).gridTemplateColumns
    })

    if (wideLayout && narrowLayout) {
      const wideColCount = wideLayout.split(' ').filter(Boolean).length
      const narrowColCount = narrowLayout.split(' ').filter(Boolean).length
      expect(wideColCount).toBeGreaterThanOrEqual(narrowColCount)
    }
  })
})
