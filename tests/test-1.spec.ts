import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.goto('http://127.0.0.1:3000/en/student/');
  await expect(page.locator('h1')).toContainText('Dashboard');

  await page.getByRole('link', { name: 'Skills', exact: true }).click();
  await page.locator('div').filter({ hasText: /^Fake Skill #57ManagementView$/ }).getByRole('button').nth(1).click();
  await page.locator('div:nth-child(2) > .lucide').click();
  await page.getByRole('img').nth(1).click();
  await page.getByPlaceholder('Type your feedback here').click();
  await page.getByPlaceholder('Type your feedback here').fill('g');
  await page.getByRole('button', { name: 'Save changes' }).click();
  await page.getByRole('link', { name: 'Groups' }).click();
  await page.getByRole('link', { name: 'Fake Group #49 Ms Mirjam Fake' }).getByRole('button').nth(1).click();
  await page.locator('div').filter({ hasText: /^TeachersMs Mirjam$/ }).getByRole('button').nth(1).click();
  await page.getByPlaceholder('E.g. Final presentation').fill('f');
  await page.locator('form svg').click();
  await page.getByRole('option', { name: 'Fake Skill #' }).locator('div').first().click();
  await page.getByRole('button', { name: 'Save' }).click();
});