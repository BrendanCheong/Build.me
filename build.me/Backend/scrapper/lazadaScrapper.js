const puppeteer = require("puppeteer");

const URL = "https://www.lazada.sg";

let scrape = async (itemSearch, maxItems) => {
  // Launch puppeteer headless browser
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
  console.log("browser opened");

  const page = await browser.newPage();
  console.log("page opened");
  await page.goto(URL, {
    waitUntil: "networkidle0",
  });

  console.log("finding search bar");
  // Searching for item on lazada
  await page.waitForSelector("#q");

  await page.type("#q", itemSearch);

  console.log("typing search bar!");

  await page.click("button.search-box__button--1oH7");
  await page.waitForNavigation({
    waitUntil: "networkidle0",
  });
  await page.waitForTimeout(2000);

  const grabItem = await page.evaluate((maxItems) => {
    // Array to hold all items
    var itemArr = [];

    // Get javascript objects
    let script = document.querySelectorAll("script");

    // Get array of items
    for (let i = 0; i < script.length; ++i) {
      // Find script with window.pageData
      if (script[i].text.includes("window.pageData")) {
        // Get txt after window.pageData
        let scriptTxt = script[i].text;
        let newScriptTxt = scriptTxt.split("window.pageData = ").pop();

        // remove last semi colon
        newScriptTxt = newScriptTxt.substring(0, newScriptTxt.lastIndexOf(";"));

        // Parse txt to JSON
        let scriptJSON = JSON.parse(newScriptTxt);
        // Set itemArr as array of items
        itemArr = scriptJSON.mods.listItems;

        break;
      }
    }

    function parseItemArr(itemArr) {
      let newArr = [];

      // Set max item limit, default to all items in page if pass in no argument
      let itemLimit = itemArr.length;

      if (maxItems !== undefined) {
        itemLimit = Math.min(itemLimit, maxItems);
      }

      // Parse array of items into array of desired JSON format
      for (let i = 0; i < itemLimit; ++i) {
        newArr.push({
          itemName: itemArr[i].name,
          itemRating:
            itemArr[i].ratingScore === "0" ? "NA" : itemArr[i].ratingScore,
          itemPrice: itemArr[i].price,
          itemVendor: itemArr[i].sellerName,
          itemURL: itemArr[i].productUrl,
          itemImg: itemArr[i].image,
        });
      }

      return newArr;
    }

    return parseItemArr(itemArr);
  }, maxItems);

  await browser.close();

  return grabItem;
};

// Filter out items WITHOUT filterName: filterStr
function lazFilter(itemArr, filterName, filterStr) {
  try {
    return itemArr.filter((item) => item[filterName].includes(filterStr));
  } catch (err) {
    return err;
  }
}

// Filter out items WITH filterName: filterStr
function lazExcludes(itemArr, filterName, filterStr) {
  try {
    return itemArr.filter((item) => !item[filterName].includes(filterStr));
  } catch (err) {
    return err;
  }
}

async function scrapper(itemSearch, maxItems) {
  try {
    const response = await scrape(itemSearch, maxItems);
    return response;
  } catch (err) {
    return err;
  }
}

module.exports.LazScrapper = scrapper;
module.exports.lazFilter = lazFilter;
module.exports.lazExcludes = lazExcludes;
