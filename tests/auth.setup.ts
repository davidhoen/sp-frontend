import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/en/login/');
    await page.getByPlaceholder('Your email').click();
    await page.getByPlaceholder('Your email').fill('student@sp.nl');
    await page.getByPlaceholder('Your password').click();
    await page.getByPlaceholder('Your password').fill('password');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.locator('h1')).toContainText('Dashboard');
    await page.context().storageState({ path: authFile });
});