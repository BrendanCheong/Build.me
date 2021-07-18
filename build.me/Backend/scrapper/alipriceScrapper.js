const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const scrapeAliPrice = async (link) => {
    let url = "https://www.aliprice.com";
    let data ="";
    let prices = [];
    let time = [];

    if (link.includes("shopee.sg")) {
        const newLink = encodeURIComponent(link);
        url += `/Search/shopee.html?link=${newLink}`;
    } else if (link.includes("amazon.sg")) {
        const newLink = encodeURIComponent(link.replace("www.amazon.sg", "www.amazon.com"));
        url += `/Search/amazon.html?link=${newLink}`;
    } else if (link.includes("qoo10.sg")) {
        throw Error()
    }

    puppeteer.use(StealthPlugin());

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--single-process",
            "--disable-dev-shm-usage",
            "--no-zygote",
        ],
    });

    try {

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });

        // Step 1: Change currency to SGD
        await page.click('span[class="sub-title"]');
        await page.waitForSelector('select[class="custom-select"]');
        await page.select('select[class="custom-select"]', 'SGD');
        await page.waitForNavigation();

        // Step 2: Scrape for the data
        const scriptJSON = await page.evaluate(() =>
            Array.from(
                document.querySelectorAll('script[type="text/javascript"]'), // select each script tags with data and add to array
                (element) => {
                const goodies = element.innerText; // select innerText
                return goodies;
                }
            )
        );
        const scriptData = scriptJSON.slice(-1)[0];
        const startIndex = scriptData.indexOf("data:[") + 5;
        const target = scriptData.slice(startIndex);
        for (let i = 0; i < target.length; ++i) {
            data += target[i];
            if (target[i] === "]") {
                break;
            }
        }
        const dataObj = JSON.parse(data);
        dataObj.forEach((e) => {
            prices.push(e.price)
            time.push(e.time_update);
        });
        return ({
            prices: prices,
            time: time,
        })

    } catch(err) {

        throw Error ("Puppeteer Fail");
    } finally {

        await browser.close();
    }
};

module.exports.AlipriceScrapper = scrapeAliPrice;