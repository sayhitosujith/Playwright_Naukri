import { test, expect, Page } from '@playwright/test';
import * as fs from "fs";

const BASE = 'https://www.naukri.com/nlogin/login';

// Helper function to perform login
async function login(page: Page, email: string, password: string) {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(BASE);

  await page.getByPlaceholder('Enter Email ID / Username').fill(email);
  await page.getByPlaceholder('Enter Password').fill(password);
  await page.getByRole('button', { name: /^Login$/ }).click();

  // Ensure login succeeded
  await expect(page).not.toHaveURL('nlogin/login');
}

// 1. Login Test and Navigate to Profile
test.describe('@Regression', () => {
  test('Happy Path: Login succeeds with valid credentials', async ({ page }) => {
    await login(page, 'vidhyaln95@gmail.com', 'Qw@12345678');

     // ---- WAIT FOR DASHBOARD ----
    // Wait until the profile link is visible before clicking
   const profileLink = page.getByRole('link', { name: /profile/i });

// Confirm link visibility
await expect(profileLink).toBeVisible({ timeout: 60000 });
// Debug log
console.log('Profile link visible:', await profileLink.isVisible());
await profileLink.click();

  });
});

// 2. Resume Upload Test
test.describe('@smoke', () => {
  test('Upload resume after login', async ({ page }) => {
    // ---- LOGIN ----
    await login(page, 'vidhyaln95@gmail.com', 'Qw@12345678');

    // ---- WAIT FOR DASHBOARD ----
    // Wait until the profile link is visible before clicking
// Add a check after login to ensure you are on the right page
await expect(page).not.toHaveURL(/nlogin\/login/i);
// Optionally, log the current URL to help debug
console.log('Current URL after login:', page.url());

// Use a more robust selector if the link text has changed
const profileLink = page.getByRole('link', { name: /profile/i });
await profileLink.waitFor({ state: 'visible', timeout: 60000 });
await profileLink.click();
    await expect(page).toHaveURL(/profile/i, { timeout: 10000 });

    // ---- UPLOAD RESUME ----
    const resumeInput = page.locator('input#attachCV');
    await resumeInput.waitFor({ state: 'visible', timeout: 10000 });
    await resumeInput.setInputFiles('Files/Vidhya_Resume.pdf');

    // Click "Update resume" button
    const updateButton = page.getByRole('button', { name: /update resume/i });
    await updateButton.waitFor({ state: 'visible', timeout: 10000 });
    await updateButton.click();
    console.log('Resume file exists:', fs.existsSync('Files/Vidhya_Resume.pdf'));

    // ---- ASSERT RESUME UPLOAD SUCCESS ----
    const successMessage = page.getByText(
      'Resume has been successfully uploaded.',
      { exact: false }
    );
    await successMessage.waitFor({ state: 'visible', timeout: 10000 });
    await expect(successMessage).toBeVisible();
  });
});
