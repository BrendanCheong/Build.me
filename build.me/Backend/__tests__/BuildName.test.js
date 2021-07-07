const puppeteer = require('puppeteer');

jest.setTimeout(600000);

test("Change the Build Name", async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000', {waitUntil: 'networkidle0'});
    await page.type('#Username', "TestAccount"); // enter test account details
    await page.type('#Email', "siyilad870@jq600.com");
    await page.type("#Password", "password1234");

    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    await page.click('a[title="Builds"]');
    await page.waitForTimeout(1000);
    await page.type('input[name="Build Name"]', 'Hello World');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    await browser.close();
})