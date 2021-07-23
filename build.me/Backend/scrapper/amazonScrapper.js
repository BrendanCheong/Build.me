const puppeteer = require("puppeteer");

const scrape = async (itemSearch, maxItems) => {

  const initialURL = "https://www.amazon.sg";
  const plusInput = itemSearch.replace(" ", "+")
  const URL = `${initialURL}/s?k=${plusInput}&ref=nb_sb_noss`

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
  console.log("Browser opened success!");
  const page = await browser.newPage();
  // to enable the use of console log in page.evaluate
  // page.on("console", (consoleObj) => console.log(consoleObj));

  try {
    await page.goto(URL, { waitUntil: "networkidle0" }); 
    console.log(`going to ${URL}!`);
    const grabItem = await page.evaluate((maxItems) => {
      // Json object to hold all items
      var itemArr = [];

      // Get item containers
      let itemCon = document.getElementsByClassName("s-result-item");
      // let itemCon = document.querySelectorAll('[data-foo="value"]');

      // Set max item limit, default to all items in page if pass in no argument
      let itemLimit = itemCon.length;

      if (maxItems !== undefined) {
        itemLimit = Math.min(itemLimit, maxItems);
      }

      // Parse HTMLCollection
      for (let i = 0; i < itemLimit; i++) {
        console.log(i);
        // Get individual item container text
        let currItemTxt = itemCon[i].innerText;

        const currItem = currItemTxt.split("\n");

        // Skip sponsored items and other texts
        var conditions = [
          "Sponsored",
          "←Previous",
          "Need help?",
          "Showing results",
        ];
        // Checks if the title contains any of the conditions
        if (
          conditions.some((e1) => currItem[0].includes(e1)) ||
          !itemCon[i].hasAttribute("data-uuid")
        ) {
          continue;
        }

        // check if rating exists
        function checkRating(itemListArr, index) {
          return !(
            typeof itemListArr[index] === "undefined" ||
            !itemListArr[index].includes("stars")
          );
        }

        // check if price exists
        function checkPrice(itemListArr, index) {
          return (
            itemListArr != null &&
            typeof itemListArr[index] != "undefined" &&
            itemListArr[index].includes("$")
          );
        }

        // get price from 2 possible indices
        function getPrice(itemListArr, ind1, ind2) {
          if (checkPrice(itemListArr, ind1)) {
            return itemListArr[ind1];
          } else if (checkPrice(itemListArr[ind2])) {
            return itemListArr[ind2];
          } else {
            return "NA";
          }
        }

        // Parses array of string into own JSON format
        function getFinalItem(itemList, itemListArr, ind1, ind2, ind3) {
          const itemName = itemListArr[ind1];
          const itemRating = checkRating(itemListArr, ind2)
            ? itemListArr[ind2]
            : "NA";
          const itemPrice = getPrice(itemListArr, ind3, ind2);
          const itemVendor = "NA";
          const itemURL = itemList[i].querySelector("a").href;
          const itemImg = itemList[i].querySelector("img").src;

          // JSON format
          return {
            itemName: itemName,
            itemRating: itemRating,
            itemPrice: itemPrice,
            itemVendor: itemVendor,
            itemURL: itemURL,
            itemImg: itemImg,
          };
        }

        // Special Case Amazon's choice
        var conditions1 = ["Amazon's Choice"];
        if (conditions1.some((elem) => currItem[0].includes(elem))) {
          itemArr.push(getFinalItem(itemCon, currItem, 1, 2, 4));
        } else {
          itemArr.push(getFinalItem(itemCon, currItem, 0, 1, 3));
        }
        console.log("Collecting results!");
      }

      return itemArr;
    }, maxItems);

    console.log(grabItem);
    return grabItem;
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Closing browser!");
    await browser.close();
  }
};

async function scrapper(itemSearch, maxItems) {
  try {
    const response = await scrape(itemSearch, maxItems);
    console.log("done!");
    return response;
  } catch (err) {
    return err;
  }
}

// scrapper("MSI B450 TOMAHAWK MAX ATX AM4 Motherboard", 10).then((res) => console.log(res));
// console.log("hello")
module.exports.Ascrapper = scrapper;
