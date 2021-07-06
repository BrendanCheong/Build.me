const puppeteer = require('puppeteer');


let browser, page;
jest.setTimeout(800000); // allows test to run as long as I want it to in miliseconds

// afterEach( async () => {
//     await browser.close();
// });

test("Login into the Build.me with the test account and navigate to Builds section", async () => {
    browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000', {waitUntil: 'networkidle0'});
    await page.type('#Username', "TestAccount"); // enter test account details
    await page.type('#Email', "siyilad870@jq600.com");
    await page.type("#Password", "password1234");

    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    await page.click('a[title="Builds"]');
})

test("Add builds to the Page", async () => {
    await page.click('button[title="Add Build"]');
    await page.waitForTimeout(100);
    await page.click('button[title="Add Build"]');
    await page.waitForTimeout(100);
    await page.click('button[title="Add Build"]');
});

test("Add CPU to the Builds Page, Amazon Product", async () => {
    const CPUbuttons = await page.$$('a[name="CPU"]');
    await CPUbuttons[0].click();
    await page.waitForTimeout(500);
    await page.click('td[name="Core i7-9700K"]');
    await page.waitForSelector('button[name="Amazon"]')
    const AmazonProducts = await page.$$('button[name="Amazon"]');
    await AmazonProducts[0].click();
    await page.waitForTimeout(500);
})

test("Add Motherboard to the Builds Page, Amazon Product", async () => {
    const MotherboardButtons = await page.$$('a[name="Motherboard"]');
    await MotherboardButtons[0].click();
    await page.waitForTimeout(500);
    await page.click('td[name="Z390 AORUS PRO WIFI ATX LGA1151 Motherboard"]');
    await page.waitForSelector('button[name="Amazon"]'); // delay here
    const AmazonProducts = await page.$$('button[name="Amazon"]');
    await AmazonProducts[0].click();
    await page.waitForTimeout(500);
})

test("Add GPU to the Builds Page, Amazon Product", async () => {
    const GPUButtons = await page.$$('a[name="GPU"]');
    await GPUButtons[0].click();
    await page.waitForTimeout(1000);
    await page.click('button[name="Next Page"]');
    await page.click('td[name="GeForce RTX 3060 Ti"]')
    await page.waitForSelector('button[name="Amazon"]')
    const AmazonProducts = await page.$$('button[name="Amazon"]');
    await AmazonProducts[0].click();
    await page.waitForTimeout(500);
})

test("Add Memory to Builds Page, Amazon Product", async () => {
    const MemoryButton = await page.$$('a[name="Memory"]');
    await MemoryButton[0].click();
    await page.waitForTimeout(1000);
    await page.click('td[name="Ripjaws V Series 16 GB (2 x 8 GB)"]');
    await page.waitForSelector('button[name="Amazon"]')
    const AmazonProducts = await page.$$('button[name="Amazon"]');
    await AmazonProducts[0].click();
    await page.waitForTimeout(500);
})

test("Add PSU to Builds Page, Amazon Product", async () => {
    const MemoryButton = await page.$$('a[name="PSU"]');
    await MemoryButton[0].click();
    await page.waitForTimeout(1000);
    await page.click('td[name="GD (2019) 600 W"]');
    await page.waitForSelector('button[name="Amazon"]')
    const AmazonProducts = await page.$$('button[name="Amazon"]');
    await AmazonProducts[0].click();
    await page.waitForTimeout(500);
})

test("Add Storage to Builds Page, Amazon Product", async () => {
    const MemoryButton = await page.$$('a[name="Storage"]');
    await MemoryButton[0].click();
    await page.waitForTimeout(500);
    await page.click('td[name="XPG SX8200 Pro"]');
    await page.waitForSelector('button[name="Amazon"]')
    const AmazonProducts = await page.$$('button[name="Amazon"]');
    await AmazonProducts[0].click();
});