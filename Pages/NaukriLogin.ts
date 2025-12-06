import type { Page, Locator } from '@playwright/test';

/**
 * Page Object for DutyDoctor staging login and header interactions.
 */
export class DutyDoctorLoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly mastheadLinks: Locator;
  readonly BookNowButton: Locator;


  constructor(page: Page) {
    this.page = page;

    this.username = page.getByRole('textbox', {
      name: 'Username or Email Address'
    });

    this.password = page.getByRole('textbox', {
      name: 'Password'
    });

    this.loginButton = page.getByRole('button', { name: 'Login' });

    this.mastheadLinks = page.locator('#masthead a');
    this.BookNowButton = page.getByRole('link', { name: /^Book Now$/ });
  }
  

  async goto(url = 'https://www.naukri.com/nlogin/login?utm_source=google&utm_medium=cpc&utm_campaign=Brand_Login_Register&gclsrc=aw.ds&gad_source=1&gad_campaignid=19863995494&gbraid=0AAAAADLp3cERcRy0ExZ4AJORJ4dGZPWun&gclid=CjwKCAiAxc_JBhA2EiwAFVs7XMIgm7oNHiTxbGytYCnJFK5uE2oVEwf6omcq4dW8SkaT5KpF15TXNhoCEUYQAvD_BwE') {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();

    // Prefer race-style waits to avoid long networkidle timeouts.
    await Promise.race([
      this.page.waitForLoadState('networkidle').catch(() => null),
      this.page.waitForSelector('text=Book Now', { timeout: 5000 }).catch(() => null)
    ]);
  }

  async fillUsername(username: string) {
    await this.username.fill(username);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

   async clickBookNow() {
    await this.BookNowButton.click();
  }

  /**
   * Confirms that the user is authenticated by checking for a known link.
   */
  async isAuthenticated(timeout = 15000): Promise<boolean> {
    return this.page
      .getByRole('link', { name: 'Book an appointment now' })
      .isVisible({ timeout })
      .catch(() => false);
  }

  /**
   * Confirms that the header/masthead is visible and the page is past
   * captcha or WP-staging login screens.
   */
  async headerAvailable(): Promise<boolean> {
    const url = this.page.url();
    if (url.includes('.well-known/sgcaptcha')) return false;

    const isWpStagingLogin = await this.page
      .getByText('WP Staging Login')
      .isVisible()
      .catch(() => false);

    const hasLoginField = await this.username
      .isVisible()
      .catch(() => false);

    if (isWpStagingLogin || hasLoginField) return false;

    return this.mastheadLinks.first().isVisible().catch(() => false);
  }

  async passwordInputType(): Promise<string | null> {
    return this.password.getAttribute('type');
  }

  async passwordInputValue(): Promise<string> {
    return this.password.inputValue();
  }

  async usernameInputValue(): Promise<string> {
    return this.username.inputValue();
  }
}

export default DutyDoctorLoginPage;
