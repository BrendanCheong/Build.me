const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

async function scrapeQoo10(itemName) {
  return await scrapeQoo10Items(itemName);
}

async function scrapeQoo10Items(itemSearch) {
  const URL = "https://www.qoo10.sg";

  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({
    headless: false,
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
    await page.goto(URL, { waitUntil: "networkidle0" });
    // Searching for item on qoo10
    await page.type("#search____keyword", itemSearch);
    await page.click("#search_____form > fieldset > button");
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await scroll(page);

    const scriptHTML = await page.evaluate(() => {
      function getStringBtwn(itemRating, str1, str2) {
        return itemRating.substring(
          itemRating.lastIndexOf(str1) + 1,
          itemRating.lastIndexOf(str2)
        );
      }
      return Array.from(
        document.querySelectorAll(
          "#div_search_result_list > table > tbody > tr"
        ),
        (element) => {
          let itemRating = element.querySelector(
            "td:nth-child(5) > span.rate_v > span"
          ).innerText;
          itemRating = itemRating === "New" ? "NA" : getStringBtwn(itemRating, "(", "/");

          return {
            itemName: element.querySelector("div > div.sbj > a").innerText,
            itemRating: itemRating,
            itemPrice: element.querySelector("td.td_prc > div.prc > strong")
              .innerText,
            itemVendor: element
              .querySelector("td.td_item > div > div.opt_dtl > a.lnk_sh")
              .getAttribute("title"),
            itemURL: element
              .querySelector("td.td_item > div.inner > div.sbj > a")
              .getAttribute("href"),
            itemImg: element
              .querySelector("td.td_thmb > div.inner > a > img")
              .getAttribute("src"),
          };
        }
      );
    });

    return scriptHTML;
  } catch (error) {
    throw error;
  } finally {
    await browser.close();
  }
}

// Scroll downwards slowly
async function scroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      // Adjust as necessary
      const y = 50,
        speed = 20;
      let heightScrolled = 0;

      setInterval(() => {
        window.scrollBy(0, y);
        heightScrolled += y;
        if (heightScrolled >= document.body.scrollHeight) {
          resolve();
        }
      }, speed);
    });
  });
}

module.exports.qoo10Scraper = scrapeQoo10;
