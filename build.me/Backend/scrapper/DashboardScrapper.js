const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const DashboardScrapper = async (type) => {

    let URL;
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
    switch (type) {
        case "CPU":
            URL = "https://www.amazon.sg/gp/bestsellers/electronics/6436532051/ref=zg_bs_nav_5_6436529051";
            break;
        case "Motherboard":
            URL = "https://www.amazon.sg/gp/bestsellers/electronics/6436540051/ref=zg_bs_nav_5_6436532051";
            break;
        case "GPU":
            URL = "https://www.amazon.sg/gp/bestsellers/electronics/6436533051/ref=zg_bs_nav_5_6436540051";
            break;
        case "Memory":
            URL = "https://www.amazon.sg/gp/bestsellers/electronics/6436531051/ref=zg_bs_nav_5_6436533051";
            break;
        case "PSU":
            URL = "https://www.amazon.sg/gp/bestsellers/electronics/6436529051/ref=zg_bs_nav_5_6436531051";
            break;
        default:
            URL = "https://www.amazon.sg/gp/bestsellers/electronics/6436278051/ref=zg_bs_nav_5_6436529051";
            console.log("Storage");
            break;
    }
    try {
        const page = await browser.newPage();
        await page.goto(URL, {waitUntil: "networkidle0"});
        const titleAttr = await page.$$eval("div.p13n-sc-truncated", (el) => {
            for (let item of el) {
                const answer = item.getAttribute("title");
                if (answer === null) {
                    continue;
                } else {
                    return answer;
                }
            }
        });
        const imgAttr = await page.$$eval('img[height="200"][width="200"]', el => {
            for (let item of el) {
                const raw = item.getAttribute("src");
                const answer = raw.replace("_AC_UL200_SR200,200_", "_AC_SX466_");
                return answer;
            }
        });
        const productURL = await page.$$eval("a.a-link-normal", el => {
            for (let item of el) {
                const answer = item.getAttribute("href");
                return answer;
            }
        });
        const ratingStars = await page.$$eval("span.a-icon-alt", el => {
            for (let item of el) {
                const answer = item.innerText;
                return answer;
            }
        });
        const currentPrice = await page.$$eval("span.p13n-sc-price", el => {
            for (let item of el) {
                const raw = item.innerText;
                const answer = raw.replace("S$", "");
                return answer;
            }
        })
        console.log("finished scraping BestSellers Pages!");
        const answer = ({
            
            Type: type,
            ProductName: titleAttr,
            ProductURL: `https://www.amazon.sg${productURL}`,
            CurrentPrice: currentPrice,
            ProductImg: imgAttr,
            ProductRating: ratingStars,

        });
        return answer;


    } catch(err) {
        console.log(err)
    } finally {
        await browser.close();
    }
}

module.exports = DashboardScrapper;