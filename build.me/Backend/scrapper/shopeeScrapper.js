const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

async function scrapeShopee(itemName) {
  const res = await scrapeShopeeScript(itemName);
  return filterJsArrByNestedKeyVal(
    filterJsArrByKeyVal(res, "@type", "Product"),
    "offers",
    "@type",
    "Offer"
  ).map((e) => getItemFromJsObj(e));
}

async function scrapeShopeeScript(itemName) {
  const encodedName = encodeURIComponent(itemName);
  const URL = "https://shopee.sg/search?keyword=" + encodedName;

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
    // override default user agent
    //await page.setUserAgent(randomUseragent.getRandom());
    await page.goto(URL, { waitUntil: "networkidle0" });

    const scriptJSON = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll('script[type="application/ld+json"]'), // select each script tags with data and add to array
        (element) => {
          const innerObject = element.innerText; // select innerText, which is the json object
          const jsonString = JSON.stringify(innerObject); // turn object into string
          return JSON.parse(jsonString); // turn string into object, this is to properly process all objects
        }
      )
    );
    // converts all elements of array to js obj
    return scriptJSON.map((e) => JSON.parse(e));
  } catch (error) {
    throw error;
  } finally {
    await browser.close();
  }
}

function filterJsArrByKeyVal(jsArr, key, value) {
  const filteredArr = jsArr.filter(function (elem) {
    return elem[key] === value;
  });
  return filteredArr;
}

function filterJsArrByNestedKeyVal(jsArr, key1, key2, value) {
  const filteredArr = jsArr.filter(function (elem) {
    return elem[key1][key2] === value;
  });
  return filteredArr;
}

function getItemFromJsObj(jsObj) {
  // returns true if key exists in js object
  function checkKeyExists(key) {
    return jsObj[key] !== undefined;
  }
  // gets value of key in js object
  function getValByKey(key) {
    return checkKeyExists(key) ? jsObj[key] : "NA";
  }
  return {
    itemName: getValByKey("name"),
    itemRating: checkKeyExists("aggregateRating")
      ? getValByKey("aggregateRating")["ratingValue"]
      : "NA",
    itemPrice: getValByKey("offers")["price"],
    itemVendor: getValByKey("Shopee"),
    itemURL: getValByKey("url"),
    itemImg: getValByKey("image"),
  };
}

module.exports.shopeeScrapper = scrapeShopee;
