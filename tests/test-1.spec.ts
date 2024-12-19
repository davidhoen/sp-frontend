import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('p');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByLabel('notifications').click();
  await page.getByRole('link', { name: 'Mr Student2 requested' }).first().click();
  await page.locator('html').click();
  await page.getByLabel('notifications').click();
  await page.locator('html').click();
  await page.getByLabel('notifications').click();
  await page.locator('html').click();
  await page.getByRole('button', { name: 'Add feedback' }).nth(1).click();
  await page.getByRole('button', { name: 'Close' }).click();
});