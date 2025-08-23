import { test, expect } from '@playwright/test';

test.describe('Demo Web Shop Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Demo Web Shop/);
  });

  test('should allow subscribing to newsletter', async ({ page }) => {
    await page.fill('#newsletter-email', 'test@example.com');
    await page.click('#newsletter-subscribe-button');
    await expect(page.locator('#newsletter-result-block')).toContainText('Thank you for signing up!');
  });

  test('should display featured products', async ({ page }) => {
    const products = page.locator('.product-grid .item-box');
    await expect(products).toHaveCount(4); // Dựa trên tài liệu, có 4 sản phẩm nổi bật
    await expect(page.locator('.product-title >> text="$25 Virtual Gift Card"')).toBeVisible();
    await expect(page.locator('.product-title >> text="14.1-inch Laptop"')).toBeVisible();
    await expect(page.locator('.product-title >> text="Build your own computer"')).toBeVisible();
    await expect(page.locator('.product-title >> text="Simple Computer"')).toBeVisible();
  });

  test('should navigate to product page when clicking a featured product', async ({ page }) => {
    await page.click('.product-title >> text="$25 Virtual Gift Card"');
    await expect(page).toHaveURL(/25-virtual-gift-card/);
    await expect(page.locator('.product-name')).toContainText('$25 Virtual Gift Card');
  });
});