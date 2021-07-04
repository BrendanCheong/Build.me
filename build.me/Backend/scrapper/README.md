# Instructions on usage

_Name_of_Scrapper.js_

const puppeteer = require('puppeteer')

const scrapperFunction = async (input1, input2) => {

.......

}

modules.exports.ScrapperName = scrapperFunction

_server.js file_

const Xscrapper = require('./scrapper/Name_of_Scrapper)'

await Xscrapper.ScrapperName(input1, input2)

---

USING scrappingFilters.js

const scrappingFilters = require("scrapper/scrappingFilters.js");

// removes bundles (for shopee)
scrappingFilters.itemExcludes(res, "itemName", "(BUNDLE)");

// removes bundles using the '+' (for shopee)
// take note the spaces in ' + '
scrappingFilters.itemExcludes(res ,"itemName"," + ");
