import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  await page.goto('http://localhost:5173/PollRequest/#/host/login');
  await page.evaluate(() => sessionStorage.setItem('pollrequest_host', 'true'));
  await page.goto('http://localhost:5173/PollRequest/#/host/questions');
  
  await page.waitForSelector('#btn-add', { timeout: 3000 });
  await page.click('#btn-add');
  
  await new Promise(r => setTimeout(r, 500));
  
  await page.type('#qf-text', 'Test question');
  await page.click('#modal-confirm-btn');
  
  await new Promise(r => setTimeout(r, 1000));
  console.log(await page.evaluate(() => document.body.innerHTML));
  
  await browser.close();
})();
