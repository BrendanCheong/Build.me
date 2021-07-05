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
// Each Test creates a new Browser to be opened
describe("Test for Error Catching when false credentials are sent in Login Page", () => {

    test("incorrect credentials", async () => {
    
        const url = await page.url();
        assert(url === 'http://localhost:3000/Login');
        await page.type('#Username', "Wrong username");
        await page.type('#Email', "Wrong Email");
        await page.type("#Password", "Test");
    
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000);
        const pTags = await page.evaluate(() => Array.from(document.getElementsByTagName('p'), element => element.textContent))
        assert(pTags.includes("One of the fields is wrong!") === true)
        
    });
});

describe("Test for Error Catching for Register page", () => {

    test("Create an account without required fields", async () => {
        await page.click('a[title="Register"]')
        await page.type("#Username", "Wrong Username");

        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000);
        const errorMessage = await page.evaluate(() => Array.from( document.getElementsByTagName('p'), ele => ele.textContent));
        assert(errorMessage.includes('Please enter all required fields') === true);
    });

    test("Create an account a valid email", async () => {
        await page.click('a[title="Register"]');
        await page.type("#Username", "AwesomeUserName");
        await page.type('#Email', "fakeEmail@@@@@");
        await page.type("#Password", "reallylongpassword");
        await page.type('input[id="Confirm Password"]', "reallylongpassword");
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000);
        const errorMessage = await page.evaluate(() => Array.from( document.getElementsByTagName('p'), ele => ele.textContent));
        assert(errorMessage.includes('Please enter a valid email') === true);
    });

    test("Enter the same password twice", async () => {
        await page.click('a[title="Register"]');
        await page.type("#Username", "AwesomeUserName");
        await page.type('#Email', "gwarfare2021@gmail.com");
        await page.type("#Password", "reallylongpassword");
        await page.type('input[id="Confirm Password"]', "Failure");
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000);
        const errorMessage = await page.evaluate(() => Array.from( document.getElementsByTagName('p'), ele => ele.textContent));
        assert(errorMessage.includes('Please enter the same password twice') === true);
    });

    test("Password is too short", async () => {
        await page.click('a[title="Register"]');
        await page.type("#Username", "AwesomeUserName");
        await page.type('#Email', "gwarfare2021@gmail.com");
        await page.type("#Password", "shorty");
        await page.type('input[id="Confirm Password"]', "shorty");
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000);
        const errorMessage = await page.evaluate(() => Array.from( document.getElementsByTagName('p'), ele => ele.textContent));
        assert(errorMessage.includes('Password needs to be at least 8 characters') === true);
    });
});


