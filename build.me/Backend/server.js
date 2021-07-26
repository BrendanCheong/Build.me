const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const CronJob = require("cron").CronJob;
const axios = require('axios');
// import router files
const CPURouter = require("./routes/CPUs");
const GPURouter = require("./routes/GPU");
const UserRouter = require("./routes/Users");
const CardRouter = require("./routes/Cards");
const RAMRouter = require("./routes/RAM");
const MoboRouter = require("./routes/Mobo");
const PSURouter = require("./routes/PSU");
const StorageRouter = require("./routes/Storage");
const BuilderRouter = require("./routes/Builder");
const BestSellerRouter = require("./routes/BestSeller");
const FPSdataRouter = require("./routes/FPSdata");
const cpuData = require("./models/cpuData.model");
const gpuData = require("./models/gpuData.model");
const auth = require("./middleware/auth");
const SchedulerAuth = require("./middleware/SchedulerAuth");
// const AmazonRouter = require('./routes/Scraper/amazonScrapper');
// const LazadaRouter = require('./routes/Scraper/LazadaScrapper')

const AmazonScrapper = require("./scrapper/amazonScrapper");
const LazadaScrapper = require("./scrapper/lazadaScrapper");
const shopeeScrapper = require("./scrapper/shopeeScrapper");
const qoo10Scrapper = require("./scrapper/qoo10Scrapper");
const AliPriceScrapper = require("./scrapper/alipriceScrapper");
const DashboardScrapper = require("./scrapper/DashboardScrapper");
const scrapeUBM = require("./scrapper/ubmScrapper");
const scrappingFilter = require("./scrapper/scrappingFilters");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8888;

// make sure port 5000 is working
app.get("/", (req, res) => {
  res.send("Hello from node.js!");
});
// view engine set-up for express handlebars for html parsing
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//BodyParser Middleware
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"], // only localhost 3000 can have cookies !!! REMEMBER TO REPLACE with Hosted Service!!!
  })
);
app.use(express.json());
app.use(cookieParser());

// Mongoose Middleware
const uri = process.env.ATLAS_URI; // uses the .env file for password and link to MongdDB
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) return console.error(err);
  }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

// these are my API end points in URLS
app.use("/CPUs", CPURouter);
app.use("/GPUs", GPURouter);
app.use("/users", UserRouter);
app.use("/Cards", CardRouter);
app.use("/Builder", BuilderRouter);
app.use("/RAMs", RAMRouter);
app.use("/Mobos", MoboRouter);
app.use("/PSUs", PSURouter);
app.use("/Storage", StorageRouter);
app.use("/BestSellers", BestSellerRouter);
app.use("/FpsData", FPSdataRouter);
// app.use('/Ascrapper',AmazonRouter);
// app.use('/LazadaScrapper', LazadaRouter);

app.get("/Ascrapper/:id", async (req, res) => {
  const input = decodeURIComponent(req.params.id);
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "text/plain",
  });
  try {
    console.log("Amazon Request Recieved");
    const answer = await AmazonScrapper.Ascrapper(input, 10);
    console.log("Sending your answer!");
    res.json(answer);
  } catch (err) {
    console.log("Never Give Up! Try Again!");
    res.status(500).json({ Error: err });
  }
});

app.get("/LazadaScrapper/:id", async (req, res) => {
  const input = decodeURIComponent(req.params.id);
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "text/plain",
  });

  try {
    console.log("Lazada Request Recieved");
    const answer = await LazadaScrapper.LazScrapper(input, 10); // lazada scrapper
    // answer = LazadaScrapper.lazExcludes(answer ,'itemName', 'Pre-Order') // excludes all items with pre order in name
    console.log("sending answer");
    res.json(answer);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

app.get("/ShopeeScrapper/:id", async (req, res) => {
  const input = decodeURIComponent(req.params.id)
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "text/plain",
  });

  try {

    console.log("Shopee Request Recieved!");
    const response = await shopeeScrapper.shopeeScrapper(input);
    const answer = scrappingFilter.itemLimit(scrappingFilter.itemExcludes(response, "itemName",[
      "bundle","laptop"," + ","lenovo","huawei","acer","hp", "fans", "powerlink", "cable", "book", "sodimm",
    ]),10)

    console.log("sending Shopee Answer");
    return res
    .status(200)
    .json(answer)
  } catch(err) {
    res.status(500).json({ Error: err });
  }
});

app.get("/Qo10Scrapper/:id", async (req, res) => {
  const input = decodeURIComponent(req.params.id)
  try {
    const exchangeRateAPI = await axios.get("https://open.er-api.com/v6/latest/USD")
    const EXrateNum = exchangeRateAPI.data.rates.SGD;
    console.log("Qo10 Request recieved!")
    
    const response = await qoo10Scrapper.qoo10Scraper(input);
    const filteredItems = scrappingFilter.itemLimit(scrappingFilter.itemExcludes(response, "itemName",[
      "hair", "cable", "panasonic", "ml", "laptop", "sodimm", "kg", "book", "chrome", "dell", "huawei", "lenovo", "acer", "heatsink", "nuc",
    ]),10)
    const answer = filteredItems.map((item) => {
      item.itemPrice = (item.itemPrice.replace("S$", "") * EXrateNum).toFixed(2)
      return item;
    })
    return res
    .status(200)
    .json(answer)
  } catch(err) {
    res.status(500).json({ Error: err });
  }
});

app.post("/PriceTrends", auth, async (req, res) => {
  const { link } = req.body;
  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "text/plain",
  });
  try {
    const answer = await AliPriceScrapper.AlipriceScrapper(link);
    console.log("sending answer");
    res.json(answer);

  } catch(err) {
    console.log("Error! Don't Give up! Try Again!");
    res.status(500).json({Error : "No information found"});
  }

})

app.post("/DashboardScraper/Monthly", SchedulerAuth, async (req, res) => {
  const { type } = req.body;
  try {
    const response = await DashboardScrapper(type)
    return res
    .status(200)
    .json(response);
    
  } catch(err) {
    console.log(err);
    res.status(500).json({Error: err})
  }
})

app.post("/UBM/CPU", auth, async (req, res) => {
  const { Brand, Model } = req.body;
  try {

    const data = await cpuData.findOne({Brand: Brand.toUpperCase(), Model: Model.toUpperCase()});
    console.log(data)
    if (!data) { // if query cannot be found in database
      return res
      .status(200)
      .json({})
    }
    const response = await scrapeUBM(data.URL);
    console.log(response)
    return res
    .status(200)
    .json(response);

  } catch(err) {
    console.log(err);
    res
    .status(500)
    .json({Error: err})
  }
})

app.post("/UBM/GPU", auth, async (req, res) => {
  const { Model } = req.body;
  function parser(input) {
    let answer1 = input.replace(" G6", "");
    let answer2 = answer1.replace("GeForce ", "");
    return answer2.replace("Radeon ", "");
  }
  try {
    let query = [];
    const InputChipSet = parser(Model);
    console.log(InputChipSet)
    const data1 = await gpuData.find({
      Model: { $in: InputChipSet.toUpperCase() },
    });
    query = data1;

    if (query.length === 0) {
      const data2 = await gpuData.find({
        Model: { $regex: InputChipSet.toUpperCase()}
      })
      query = data2;
    }

    if (query.length === 0) {
      const input = Model.split(" ").join("-")
      const data3 = await gpuData.find({
        URL: { $regex: input}
      })
      query = data3;
    }
    console.log(query[0])
    if (!query[0]) { // if query cannot be found in database
      return res
      .status(200)
      .json({})
    }

    const response = await scrapeUBM(query[0].URL);

    return res
    .status(200)
    .json(response);

  } catch(err) {
    console.log(err);
    res
    .status(500)
    .json({Error: err})
  }
})
/* cron Job at regular intervals, only works if Dyno is not asleep (Shouldn't be a problem with ping system set-up)
  * Here we have our monthly updates for the Amazon BestSellers
  * It will update the database on the first day of every month
  * If Error encountered, it will console.log(error)
  * It must be authenticated via the ADMIN_PASS
  * Remember to change the localhost to actual deployment site URL
  * Selected Product Types: CPU, Motherboard, GPU, Memory, PSU, Storage
  */
const BestSeller1 = new CronJob('30 20 1 * *', async () => {
  const TypesArray = ["CPU", "Motherboard", "GPU"];
  for (let item of TypesArray) {
    try {

      const Dashboard = await axios.post("http://localhost:8888/DashboardScraper/Monthly", {
        "password": process.env.ADMIN_PASS,
        "type": item,
      });
      const DashboardData = Dashboard.data;
      const AliPrice = await AliPriceScrapper.AlipriceScrapper(DashboardData.ProductURL);
      const ExchangeRate = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API}/latest/USD`);
      const SGDrate = ExchangeRate.data.conversion_rates.SGD;
      const ProccessedPrices = AliPrice.prices.map((x) => (x * SGDrate).toFixed(2));
      const payload = {
        Type: item,
        ProductName: DashboardData.ProductName,
        ProductURL: DashboardData.ProductURL,
        CurrentPrice: DashboardData.CurrentPrice,
        ProductImg : DashboardData.ProductImg,
        ProductRating: DashboardData.ProductRating,
        ProductTime: AliPrice.time,
        ProductPrices: ProccessedPrices,
        password: process.env.ADMIN_PASS,
      }
      const response = await axios.patch(`http://localhost:8888/BestSellers/update/${item}`, payload);
  
      console.log(response.data);
  
    } catch(err) {
      console.log(err)
    }
  }
}, null, true, "UTC");

const BestSeller2 = new CronJob('30 20 2 * *', async () => {
  const TypesArray = ["Memory", "PSU", "Storage"];
  for (let item of TypesArray) {
    try {

      const Dashboard = await axios.post("http://localhost:8888/DashboardScraper/Monthly", {
        "password": process.env.ADMIN_PASS,
        "type": item,
      });
      const DashboardData = Dashboard.data;
      const AliPrice = await AliPriceScrapper.AlipriceScrapper(DashboardData.ProductURL);
      const ExchangeRate = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API}/latest/USD`);
      const SGDrate = ExchangeRate.data.conversion_rates.SGD;
      const ProccessedPrices = AliPrice.prices.map((x) => (x * SGDrate).toFixed(2));
      const payload = {
        Type: item,
        ProductName: DashboardData.ProductName,
        ProductURL: DashboardData.ProductURL,
        CurrentPrice: DashboardData.CurrentPrice,
        ProductImg : DashboardData.ProductImg,
        ProductRating: DashboardData.ProductRating,
        ProductTime: AliPrice.time,
        ProductPrices: ProccessedPrices,
        password: process.env.ADMIN_PASS,
      }
      const response = await axios.patch(`http://localhost:8888/BestSellers/update/${item}`, payload);
  
      console.log(response.data);
  
    } catch(err) {
      console.log(err)
    }
  }
}, null, true, "UTC")

BestSeller1.start();
BestSeller2.start();
console.log(`BestSeller 1 is running = ${BestSeller1.running}`);
console.log(`BestSeller 2 is running = ${BestSeller2.running}`);

app.listen(PORT, () => console.log(`Server Running at ${PORT}, Awesome!`));
