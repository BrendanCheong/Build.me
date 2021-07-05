const puppeteer = require('puppeteer');
const assert = require('assert');


let browser, page;
jest.setTimeout(600000); // allows test to run as long as I want it too
beforeEach( async () => {

    browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000', {waitUntil: 'networkidle0'});
});

afterEach( async () => {
    await browser.close();
});

test('Logging in successfully and Logging Out', async () => {

    await page.type('#Username', "TestAccount");
    await page.type('#Email', "siyilad870@jq600.com");
    await page.type("#Password", "password1234");

    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);

    await page.click('a[title="User"]');
    const h1Tags = await page.evaluate(() => Array.from(document.getElementsByTagName('h1'), element => element.textContent))
    assert(h1Tags.includes('Coming Soon') === true);
    await page.click('button[title="LogOut"]');
    await page.waitForTimeout(1000);
    await page.type('#Username', "Back Here Again");
    await page.waitForTimeout(1000);

});