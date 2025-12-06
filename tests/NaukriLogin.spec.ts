//............Run Browser specific Commands...............................
// npx playwright test tests/DutyDoctorLogin.spec.ts --project=Chrome
// npx playwright test tests/DutyDoctorLogin.spec.ts --project=chromium
//.....................................................
// npx playwright test --grep "@smoke"
// npx playwright test -g "Homepage: Verify Navigation bars " --headed

//........Run only Smoke AND Negative tests.........
//npx playwright test --grep "@Smoke.*@negative"

//.....Run Smoke tests but exclude Negative tests.....
//npx playwright test --grep "@Smoke" --grep-invert "@negative"



import { test, expect } from '@playwright/test';
import NaukriLoginPage from '../Pages/NaukriLogin.js';
import fs from 'fs';


// Load credentials from JSON
const config = JSON.parse(fs.readFileSync('./credentials.json', 'utf-8'));
const BASE_URL = config.baseUrl;
const USERNAME = String(config.username);
const PASSWORD = String(config.password);
const RUN_HEADER_CHECKS =
  process.env.RUN_HEADER_CHECKS === 'true' ||
  process.env.RUN_HEADER_CHECKS === '1';

test.describe('Naukri Login validations and Homepage functionality', () => {

  // 1. Happy Path: Login succeeds - PASS

  test.describe('@Smoke @Regression', () => {
  test('Happy Path: Login succeeds with valid credentials', async ({ page }) => {
    const login = new NaukriLoginPage(page);

    await login.goto(BASE_URL);
    await login.login(USERNAME, PASSWORD);

    await expect.poll(async () => login.isAuthenticated(), {
      timeout: 5000
    }).toBe(false);
  });
  });

 






});


  
         