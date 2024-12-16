import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('s');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('p');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Groups' }).click();
  await page.getByRole('link', { name: 'Fake Group #62 Ms Mirjam Fake' }).getByRole('button').nth(1).click();
  await page.locator('div').filter({ hasText: /^TeachersMs Mirjam$/ }).getByRole('button').first().click();
  await page.getByPlaceholder('E.g. Practice presentation').click();
  await page.getByPlaceholder('E.g. Practice presentation').fill('P');
  await page.locator('form svg').click();
  await page.getByRole('option', { name: 'Fake Skill #77' }).locator('div').first().click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('div').filter({ hasText: /^TeachersMs Mirjam$/ }).getByRole('button').first().press('Escape');
});