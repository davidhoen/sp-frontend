import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {
  //login
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('h1')).toContainText('Dashboard');
  //logout
  await page.locator('header').getByRole('button').nth(1).dblclick();
  await page.getByText('Logout').click();
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('h1')).toContainText('Dashboard');
});

test('Language switch', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('#Competencies')).toContainText('Competencies');
  await page.locator('header').getByRole('button').nth(1).click();
  await page.getByText('Nederlands').click();
  await expect(page.locator('#Competenties')).toContainText('Competenties');
});

test('Select a personal coach', async ({ page }) => {
  //login
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('h1')).toContainText('Dashboard');
  //profile dropdown
  await page.locator('header').getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'My personal coach' }).click();
  await expect(page.getByRole('heading')).toContainText('Update personal coach');
  await expect(page.getByRole('paragraph')).toContainText('Select a coach to help you with your personal development. This person will have insight into your skills and your continued progress.');
  await page.locator('[id="\\:rk\\:-form-item"] svg').click();
  await page.getByLabel('Update personal coach').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('h1')).toContainText('Dashboard');
});

test('Add skill', async ({ page }) => {
  //login
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.locator('h1')).toContainText('Dashboard');
  //skills menu
  await page.getByRole('link', { name: 'Skills', exact: true }).click();
  //information icon
  /*await page.locator('div').filter({ hasText: /^Skills$/ }).locator('path').nth(1).click();
  await page.getByRole('heading', { name: 'Definition:' }).click();
  await page.getByText('A skill is a specific ability').click();
  await page.locator('div').filter({ hasText: /^Skills$/ }).click();*/
  //filtering(competence)
  await page.getByRole('button', { name: 'cum' }).click();
  await page.getByText('cum').nth(1).click();
  await page.getByRole('button', { name: 'All competencies' }).click();
  //search
  await page.getByPlaceholder('Search', { exact: true }).click();
  await page.getByPlaceholder('Search', { exact: true }).fill('b');
  await page.goto('http://127.0.0.1:3000/en/student/skills/?search=b');
  await page.getByText('beatae').click();
  //add skill
  await page.locator('div').filter({ hasText: /^beatae$/ }).getByRole('button').click();
  //skills detail page
  await page.getByRole('heading', { name: 'beatae' }).click();
  await page.getByRole('link', { name: 'Director Director' }).click();
  await page.getByRole('heading', { name: 'Rating' }).click();
  await page.getByRole('heading', { name: 'Your journey' }).click();
  await page.getByText('Feedback0').click();
  await page.getByRole('heading', { name: 'Endorsements' }).click();
  //filtering(added)
  await page.getByRole('link', { name: 'Skills' }).click();
  await page.getByRole('radio', { name: 'Added skills' }).click();
  await page.getByText('beatae').click();
});

test('Group', async ({ page }) => {
  //login
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.locator('h1')).toContainText('Dashboard');
  //dashboard(enrolled groups)
  await page.getByRole('heading', { name: 'Enrolled groups' }).click();
  //groups menu
  await page.getByRole('link', { name: 'Groups' }).click();
  //search(not working)
  await page.getByPlaceholder('Search', { exact: true }).click();
  await page.getByPlaceholder('Search', { exact: true }).fill('m');
  await page.goto('http://127.0.0.1:3000/en/student/groups/?search=m');
  //groups detail page
  await page.getByRole('link', { name: 'Groups' }).click();
  await page.getByRole('link', { name: 'Mr. Jayme Wisoky Jr. ADMIN' }).click();
  await page.getByRole('heading', { name: 'Mr. Jayme Wisoky Jr.' }).click();
  await page.getByText('Molestiae totam sed').click();
  await page.getByRole('heading', { name: 'Teachers' }).click();
  await page.getByRole('heading', { name: 'Skills' }).click();
  await page.getByRole('heading', { name: 'Students' }).click();

  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.locator('h1')).toContainText('Dashboard');
});

test('Writing feedback(individual)', async ({ page }) => {
  //login
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.locator('h1')).toContainText('Dashboard');
  //skills menu
  await page.getByRole('link', { name: 'Skills', exact: true }).click();
  await page.locator('div').filter({ hasText: /^rerumcumAdd feedback$/ }).getByRole('button').nth(1).click();
  //add feedback
  await page.getByRole('heading', { name: 'Your journey' }).click();
  await page.getByRole('button', { name: 'Add feedback' }).first().click();
  //feedback modal
  await page.getByPlaceholder('E.g. Practice presentation').fill('P');
  await page.getByPlaceholder('Type your feedback here').click();
  await page.getByPlaceholder('Type your feedback here').fill('n');
  await page.getByRole('button', { name: 'Save' }).click();

  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.locator('h1')).toContainText('Dashboard');
});

test('Requesting feedback(teacher)', async ({ page }) => {
  //login
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();
  
  await expect(page.locator('h1')).toContainText('Dashboard');

  await page.getByRole('link', { name: 'Groups' }).click();
  await page.getByRole('link', { name: 'Mr. Jayme Wisoky Jr. ADMIN' }).click();
  await expect(page.getByRole('heading', { name: 'Mr. Jayme Wisoky Jr.' })).toBeVisible();
  await page.getByRole('heading', { name: 'Mr. Jayme Wisoky Jr.' }).click();
  await expect(page.locator('h1')).toContainText('Mr. Jayme Wisoky Jr.');
  await page.getByText('Molestiae totam sed').click();
  await expect(page.getByRole('paragraph')).toContainText('Molestiae totam sed aspernatur exercitationem totam fugiat.');
  await page.locator('div').filter({ hasText: /^TeachersADMIN null$/ }).getByRole('button').click();
  await page.getByPlaceholder('E.g. Practice presentation').fill('p');
  //await page.locator('[id="\\:rq\\:-form-item"] path').click();
  //await page.getByLabel('Request feedback').click();
  await page.getByRole('button', { name: 'Close' }).click();
  
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.locator('h1')).toContainText('Dashboard');
});

test('Viewing received feedback/endorsement', async ({ page }) => {
  //login
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.locator('h1')).toContainText('Dashboard');
  //skills menu
  await page.getByRole('link', { name: 'Skills', exact: true }).click();
  //skills detail page
  await page.locator('div').filter({ hasText: /^rerumcumAdd feedback$/ }).getByRole('button').nth(1).click();
  await page.getByRole('heading', { name: 'Your journey' }).click();
  await page.getByRole('button', { name: 'Sort by date' }).click();
  //notification
  await page.getByLabel('notifications').click();
  await page.getByText('You currently have no').click();
  await page.locator('html').click();
  //recent endorsements
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await page.getByRole('heading', { name: 'Recent endorsements' }).click();
  await page.getByRole('link', { name: 'delectus Laborum autem magni' }).click();
  //competencies detail page 
  await page.getByRole('link', { name: 'Competencies' }).click();
  await page.locator('div:nth-child(4) > a > .inline-flex').click();
  await page.getByRole('link', { name: 'hic Rating: 0 out of 4 stars' }).click();
  await expect(page.locator('h1')).toContainText('hic');
  
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.locator('h1')).toContainText('Dashboard');
});