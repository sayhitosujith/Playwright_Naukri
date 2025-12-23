import { test } from '@playwright/test';

test('Save Naukri auth state', async ({ page }) => {
  await page.goto('https://www.naukri.com/nlogin/login');

  console.log('👉 Login manually and solve captcha');

  await page.getByRole('link', { name: /profile/i }).waitFor({
    timeout: 120000,
  });

  await page.context().storageState({ path: 'auth.json' });
});
