import { Given, When, Then, setDefaultTimeout, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';

setDefaultTimeout(60 * 1000); // Timeout 60 giây

let browser: Browser;
let page: Page;

// Hook để khởi tạo browser trước mỗi scenario
Given('I am on the home page', async function () {
    browser = await chromium.launch({ headless: false }); // Hoặc headless: false để xem trình duyệt
    page = await browser.newPage();
    await page.goto('https://demowebshop.tricentis.com/');
});

// Hook để đóng browser sau mỗi scenario (có thể dùng After hook của Cucumber)
After(async () => {
    if (browser) await browser.close();
});

Then('the page title should be {string}', async function (title: string) {
    await expect(page).toHaveTitle(title);
});

When('I enter email {string} in the newsletter field', async function (email: string) {
    await page.fill('#newsletter-email', email);
});

When('I click the subscribe button', async function () {
    await page.click('#newsletter-subscribe-button');
});

Then('I should see the success message {string}', async function (message: string) {
    await expect(page.locator('#newsletter-result-block')).toContainText(message);
});

Then('the featured product {string} should be visible', async function (productName: string) {
    await expect(page.locator(`.product-title >> text="${productName}"`)).toBeVisible();
});

When('I click on the product {string}', async function (productName: string) {
    await page.click(`.product-title >> text="${productName}"`);
});

Then('I should be redirected to the product page with name {string}', async function (productName: string) {
    await expect(page).toHaveURL(/25-virtual-gift-card/); // Cập nhật regex nếu cần cho sản phẩm khác
    await expect(page.locator('.product-name')).toContainText(productName);
});