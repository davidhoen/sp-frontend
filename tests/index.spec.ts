import { test, expect } from '@playwright/test';

test('Change language', async ({ page }) => {

  await page.goto('http://localhost:3000/nl/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();

  // Wait a little
  await page.waitForTimeout(3000);

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.locator('header').getByRole('button').nth(1).click();
  await page.getByText('English').click();
  await expect(page.locator('#Competencies')).toContainText('Competencies');
  await page.locator('header').getByRole('button').nth(1).click();
  await page.getByText('Nederlands').click();
  await expect(page.locator('#Competenties')).toContainText('Competenties');
  await page.locator('header').getByRole('button').nth(1).click();
  await page.getByText('Uitloggen').click();

  // Wait a little
  await page.waitForTimeout(3000);

  await expect(page.getByRole('button')).toContainText('Log in');
});