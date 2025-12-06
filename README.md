
 install playwright
npm init playwright@latest

--------------------------------------
Install browsers
npx playwright install


--------------------------------------


install specific browsers
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit

------------------------------------
Run tests

Run Full Files headlessmode  - npx playwright test 
Run Full Files headed mode  - npx playwright test --headed
npx playwright test Flipkart_Search.spec.ts --headed
npx playwright test TS_001_Naukri_Login.spec.ts --headed
------------------------------------
git commands 

git add .
git commit -m "comment"
git push origin master