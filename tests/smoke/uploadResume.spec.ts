import { test } from '@playwright/test';
import { NaukriProfilePage } from '../../pages/NaukriProfilePage.js';

test('@smoke Upload resume', async ({ page }) => {
  const profilePage = new NaukriProfilePage(page);

  await profilePage.gotoHome();
  await profilePage.openProfile();
  await profilePage.uploadResume('Files/Vidhya_Resume.pdf');
  await profilePage.verifyResumeUploaded();
});
