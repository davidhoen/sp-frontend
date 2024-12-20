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
  await page.locator('[id="\\:rl\\:-form-item"] svg').click();
  await page.getByRole('option', { name: 'TEACHER null' }).locator('div').first().click();
  await page.getByRole('button', { name: 'Save' }).click();
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
  //pagination
  await page.getByLabel('pagination').getByText('2').click();
  await page.getByText('1', { exact: true }).click();
  //profile detail page 
  await page.locator('div').filter({ hasText: /^Fake Skill #56ManagementView$/ }).getByRole('button').nth(1).click();
  await page.locator('.flex > a').first().click();
  await page.getByRole('link', { name: 'Skills', exact: true }).click();
  //information icon
  /*await page.locator('div').filter({ hasText: /^Skills$/ }).locator('path').nth(1).click();
  await page.getByRole('heading', { name: 'Definition:' }).click();
  await page.getByText('A skill is a specific ability').click();
  await page.locator('div').filter({ hasText: /^Skills$/ }).click();*/
  //filtering(competence)
  await page.getByRole('button', { name: 'Realize' }).click();
  await page.getByText('Realize').nth(1).click();
  await page.getByRole('button', { name: 'All competencies' }).click();
  //search
  await page.getByPlaceholder('Search', { exact: true }).click();
  await page.getByPlaceholder('Search', { exact: true }).fill('f');
  await page.goto('http://127.0.0.1:3000/en/student/skills/?search=f');
  await page.getByText('Fake Skill #1').click();
  //add skill
  await page.locator('div').filter({ hasText: /^Fake Skill #32$/ }).getByRole('button').click();
  //skills detail page
  await page.getByRole('heading', { name: 'Fake Skill #32' }).click();
  await page.getByRole('heading', { name: 'Rating' }).click();
  await page.getByRole('heading', { name: 'Your journey' }).click();
  await page.getByText('Feedback0').click();
  await page.getByRole('heading', { name: 'Endorsements' }).click();
  //filtering(added)
  await page.getByRole('link', { name: 'Skills' }).click();
  await page.getByRole('radio', { name: 'Added skills' }).click();
  await page.getByText('Fake Skill #32').click();
});

test('Group', async ({ page }) => {
  //login
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('std2@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.locator('h1')).toContainText('Dashboard');
  //dashboard(enrolled groups)
  await page.getByRole('heading', { name: 'Enrolled groups' }).click();
  //groups menu
  await page.getByRole('link', { name: 'Groups' }).click();
  //search
  await page.getByPlaceholder('Search', { exact: true }).click();
  await page.getByPlaceholder('Search', { exact: true }).fill('f');
  await page.goto('http://127.0.0.1:3000/en/student/groups/?search=f');
  //filtering 
  await page.getByRole('radio', { name: 'Enrolled groups' }).click();
  await expect(page.locator('div').filter({ hasText: /^Fake Group #81$/ }).getByRole('button')).toBeVisible();
  await page.getByRole('radio', { name: 'All groups' }).click();
  await expect(page.locator('div').filter({ hasText: /^Fake Group #62$/ }).getByRole('button')).toBeVisible();
  //groups detail page
  await page.getByRole('link', { name: 'Groups' }).click();
  await page.getByRole('link', { name: 'Fake Group #81 Ms Marit Fake' }).getByRole('button').nth(1).click();
  await expect(page.locator('h1')).toContainText('Fake Group #81');
  await page.getByRole('heading', { name: 'Teachers' }).click();
  await expect(page.locator('#Teachers')).toContainText('Teachers');
  await expect(page.locator('#Skills')).toContainText('Skills');
  await expect(page.locator('#Students')).toContainText('Students');

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
  await page.locator('div').filter({ hasText: /^Fake Skill #1ManageView$/ }).getByRole('link').click();
  //add feedback
  await page.getByRole('heading', { name: 'Your journey' }).click();
  await page.getByRole('button', { name: 'Add feedback' }).first().click();
  //feedback modal
  await page.getByPlaceholder('E.g. Practice presentation').fill('test feedback');
  await page.getByPlaceholder('Type your feedback here').click();
  await page.getByPlaceholder('Type your feedback here').fill('perfect working');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Close' }).click();

  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.locator('h1')).toContainText('Dashboard');
});

test('Requesting Feedback(peer)', async ({ page }) => {
  //login
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.locator('h1')).toContainText('Dashboard');
  //groups menu
  await page.getByRole('link', { name: 'Groups' }).click();
  //groups detail page
  await page.getByRole('link', { name: 'Fake Group #49 Ms Mirjam Fake' }).getByRole('button').nth(1).click();
  await page.locator('div').filter({ hasText: /^YouMr Student2Mr Student3$/ }).getByRole('button').first().click();
  await page.getByPlaceholder('E.g. Practice presentation').click();
  await page.getByPlaceholder('E.g. Practice presentation').fill('p');
  await page.locator('form svg').click();
  await page.getByRole('option', { name: 'Fake Skill #' }).locator('div').first().click();
  await page.getByRole('button', { name: 'Save' }).click();
  
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.locator('h1')).toContainText('Dashboard');
});

test('Writing Feedback(peer)', async ({ page }) => {
  //login
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();

  //await expect(page.locator('h1')).toContainText('Dashboard');
  //notification
  await page.getByLabel('notifications').click();
  await page.getByRole('link', { name: 'Mr Student2 requested' }).first().click();
  await page.locator('html').click();
  await page.getByRole('button', { name: 'Add feedback' }).nth(1).click();
  await page.getByPlaceholder('Type your feedback here').fill('good presentation');
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
  //groups menu
  await page.getByRole('link', { name: 'Groups' }).click();
  //groups detail page
  await page.getByRole('link', { name: 'Fake Group #49 Ms Mirjam Fake' }).getByRole('button').nth(1).click();
  await page.locator('div').filter({ hasText: /^TeachersMs Mirjam$/ }).getByRole('button').first().click();
  await page.getByPlaceholder('E.g. Practice presentation').click();
  await page.getByPlaceholder('E.g. Practice presentation').fill('practice presentation');
  await page.locator('form svg').click();
  await page.getByRole('option', { name: 'Fake Skill #' }).locator('div').first().click();
  await page.getByRole('button', { name: 'Save' }).click();
  
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.locator('h1')).toContainText('Dashboard');
});

test('Requesting endorsement(external party)', async ({ page }) => {
  //login
  await page.goto('http://127.0.0.1:3000/en/login/');
  await page.getByPlaceholder('Your email').click();
  await page.getByPlaceholder('Your email').fill('student@sp.nl');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();

  //await expect(page.locator('h1')).toContainText('Dashboard');
  //skills menu
  await page.getByRole('link', { name: 'Skills', exact: true }).click();
  //skills detail apge
  await page.locator('div').filter({ hasText: /^Fake Skill #57RealizeView$/ }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Request endorsement' }).click();
  await page.getByPlaceholder('E.g. Final presentation').click();
  await page.getByPlaceholder('E.g. Final presentation').fill('final presentation');
  await page.getByPlaceholder('bob@company.com').click();
  await page.getByPlaceholder('bob@company.com').fill('thankyou@sookmyung.ac.kr');
  await page.getByRole('button', { name: 'Save' }).click();

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
  //skills detail page
  await page.getByRole('link', { name: 'Skills', exact: true }).click();
  await page.locator('div').filter({ hasText: /^rerumcumView$/ }).getByRole('button').nth(1).click();
  await expect(page.locator('#Feedback')).toContainText('Feedback');
  //notification
  await page.getByLabel('notifications').click();
  await page.getByText('You currently have no').click();
  await page.locator('html').click();
  //recent endorsements
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await page.getByRole('heading', { name: 'Recent endorsements' }).click();
  await expect(page.locator('[id="Recent\\ endorsements"]')).toContainText('Recent endorsements');
  //competencies detail page 
  await page.getByRole('link', { name: 'Competencies' }).click();
  await page.getByPlaceholder('Search', { exact: true }).click();
  await page.getByPlaceholder('Search', { exact: true }).fill('r');
  await page.goto('http://127.0.0.1:3000/en/student/competencies/?search=r');
  await page.locator('div:nth-child(3) > a > .inline-flex').click();
  await expect(page.locator('#Skills')).toContainText('Skills');
  await page.getByRole('link', { name: 'hic Rating: 1 out of 4' }).click();
  await expect(page.locator('#Feedback')).toContainText('Feedback');
  //profile detail page
  await expect(page.locator('h1')).toContainText('Dashboard');
  await expect(page.locator('[id="\\ \\,Profiles"]')).toContainText('Profiles');
  await page.getByRole('link', { name: 'Technologist' }).click();
  await expect(page.locator('[id="Technologist\\ chart"]')).toContainText('Technologist chart');
  
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.locator('h1')).toContainText('Dashboard');
});