import { test, expect } from '@playwright/test';

const BASE = 'https://www.naukri.com/nlogin/login';

test.describe('@Smoke', () => {

  test('Happy Path: Login succeeds with valid credentials', async ({ page }) => {
    await page.goto(BASE);

    // Login
    await page.getByPlaceholder('Enter Email ID / Username').fill('vidhyaln95@gmail.com');
    await page.getByPlaceholder('Enter Password').fill('Qw@12345678');
    await page.getByRole('button', { name: /^Login$/ }).click();

    // Verify login success
    await expect(page).not.toHaveURL(/nlogin/i);
  });

  test('Upload resume after login', async ({ page }) => {
    await page.goto(BASE);

    // Login
    await page.getByPlaceholder('Enter Email ID / Username').fill('vidhyaln95@gmail.com');
    await page.getByPlaceholder('Enter Password').fill('Qw@12345678');
    await page.getByRole('button', { name: /^Login$/ }).click();

    // Ensure login completed
    await expect(page).not.toHaveURL(/nlogin/i);

    // ---- OPEN PROFILE MENU ----
    await page.getByRole('link', { name: /view profile/i }).click();
    await expect(page).toHaveURL(/profile/i);

    // ---- UPLOAD RESUME ----
    const resumeInput = page.locator('#attachCV');
    await resumeInput.setInputFiles('Files/Vidhya_Resume.pdf');

    // Click "Update resume" button
    await page.getByRole('button', { name: /update resume/i }).click();

    // ---- ASSERT RESUME UPLOAD SUCCESS ----
    // Use the exact success message with a longer timeout
    await expect(
      page.getByText('Resume has been successfully uploaded.', { exact: false })
    ).toBeVisible({ timeout: 10000 });
  });

});
