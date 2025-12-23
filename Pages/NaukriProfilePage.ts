import { Page, Locator, expect } from '@playwright/test';

export class NaukriProfilePage {
  readonly page: Page;
  readonly profileLink: Locator;
  readonly resumeInput: Locator;
  readonly updateResumeButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.profileLink = page.getByRole('link', { name: /profile/i });
    this.resumeInput = page.locator('input#attachCV');
    this.updateResumeButton = page.getByRole('button', {
      name: /update resume/i,
    });
    this.successMessage = page.getByText(
      /resume has been successfully uploaded/i
    );
  }

  async gotoHome() {
    await this.page.goto('https://www.naukri.com');
  }

  async openProfile() {
    await expect(this.profileLink).toBeVisible({ timeout: 30000 });
    await this.profileLink.click();
    await expect(this.page).toHaveURL(/profile/i);
  }

  async uploadResume(filePath: string) {
    await expect(this.resumeInput).toBeVisible({ timeout: 15000 });
    await this.resumeInput.setInputFiles(filePath);
    await this.updateResumeButton.click();
  }

  async verifyResumeUploaded() {
    await expect(this.successMessage).toBeVisible({ timeout: 15000 });
  }
}
