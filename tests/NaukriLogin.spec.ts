import { test, expect } from '@playwright/test';

const BASE = 'https://www.naukri.com/nlogin/login';

test.describe('@Smoke', () => {

  test('Happy Path: Login succeeds with valid credentials', async ({ page }) => {

    await page.goto(BASE);

    // Login
    await page.getByPlaceholder('Enter Email ID / Username').fill('vidhyaln95@gmail.com');
    await page.getByPlaceholder('Enter Password').fill('Qw@12345678');
    await page.getByRole('button', { name: /^Login$/ }).click();

    // Verify logged in by expecting URL to change away from login
    await expect(page).not.toHaveURL(/nlogin/i);
  });

  // -2.Upload resume after login-------------------------------------------------------------------
test.describe('@Smoke', () => {
  test('Upload resume after login', async ({ page }) => {

    await page.goto(BASE);

    // Login
    await page.getByPlaceholder('Enter Email ID / Username').fill('vidhyaln95@gmail.com');
    await page.getByPlaceholder('Enter Password').fill('Qw@12345678');
    await page.getByRole('button', { name: /^Login$/ }).click();

    // Ensure login completed
    await expect(page).not.toHaveURL(/nlogin/i);

    // ---- OPEN PROFILE MENU ----
    // Naukri uses a "View profile" link in the header (ROLE = link)
    await page.getByRole('link', { name: /view profile/i }).click();

    // ---- WAIT FOR PROFILE PAGE ----
    await expect(page).toHaveURL(/profile/i);

    // ---- UPLOAD RESUME ----
    // Direct file input (always works even if hidden)
    const fileChooser = page.locator('input[type="file"]');
    await fileChooser.setInputFiles('Files/Vidhya_Resume.pdf');

    // ---- ASSERT RESUME UPLOAD SUCCESS ----
    await expect(
      page.getByText(/resume (uploaded|updated|success)/i)
    ).toBeVisible();
  });

});
