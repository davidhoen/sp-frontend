import { test, expect } from '@playwright/test';

test('Change language', async ({ page }) => {
  await page.goto('/nl/login/');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('admin@sp');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Login' }).click();

  // Expect url to contain the default language nl
  expect(page.url()).toContain('/nl/');
  await page.getByRole('button').nth(1).click();
  await page.getByText('English').click();

  // Wait a little
  await page.waitForTimeout(1000);

  // Expect url to contain the new language en
  expect(page.url()).toContain('/en/');

  await page.getByRole('button').nth(1).click();
  await page.getByRole('menuitem', { name: 'nl Nederlands' }).click();

  // Wait a little
  await page.waitForTimeout(1000);

  expect(page.url()).toContain('/nl/');
});