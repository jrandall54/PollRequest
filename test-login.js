import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err));
  
  // Catch unhandled rejections
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('unhandledrejection', event => {
      console.log('UNHANDLED REJECTION:', event.reason);
    });
  });

  await page.goto('http://localhost:5173/PollRequest/#/host/login');
  await page.waitForSelector('#admin-password');
  await page.type('#admin-password', 'admin');
  await page.click('#btn-login');
  
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
