import { test, expect } from '@playwright/test';

const routes = [
  '/', '/girls/', '/girls/misaki/', '/swimsuits/', '/skills/',
  '/guide/', '/guide/festival/', '/community/', '/search/',
  '/tools/', '/tools/panel/', '/tools/plan/', '/collection/', '/sections/'
];

const slug = (r) => r.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'home';

test.describe('视觉回归', () => {
  for (const route of routes) {
    test('浅色 ' + route, async ({ page }) => {
      await page.goto(route);
      await page.waitForTimeout(900);
      await expect(page).toHaveScreenshot(slug(route) + '.png', { fullPage: true, maxDiffPixelRatio: 0.03 });
    });
    test('深色 ' + route, async ({ page }) => {
      await page.goto(route);
      await page.evaluate(() => { localStorage.setItem('theme', 'dark'); document.documentElement.classList.add('dark'); });
      await page.waitForTimeout(900);
      await expect(page).toHaveScreenshot('dark_' + slug(route) + '.png', { fullPage: true, maxDiffPixelRatio: 0.03 });
    });
  }

  test('泳装弹窗', async ({ page }) => {
    await page.goto('/swimsuits/');
    await expect(page.locator('#sList .glass-card').first()).toBeVisible({ timeout: 20000 });
    await page.locator('#sList .glass-card').first().click();
    await page.waitForTimeout(600);
    await expect(page).toHaveScreenshot('swim_modal.png', { maxDiffPixelRatio: 0.03 });
  });

  test('女孩悬浮页', async ({ page }) => {
    await page.goto('/girls/');
    await expect(page.locator('#grid > a').first()).toBeVisible({ timeout: 15000 });
    await page.locator('#grid > a').first().click();
    await page.waitForTimeout(600);
    await expect(page).toHaveScreenshot('girl_modal.png', { maxDiffPixelRatio: 0.03 });
  });

  test('技能悬浮页', async ({ page }) => {
    await page.goto('/skills/');
    await expect(page.locator('.card-wiki').first()).toBeVisible({ timeout: 15000 });
    await page.locator('.card-wiki').first().click();
    await page.waitForTimeout(400);
    await expect(page).toHaveScreenshot('skill_modal.png', { maxDiffPixelRatio: 0.03 });
  });
});
