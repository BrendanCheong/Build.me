const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const path = require("path");
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
const auth = require("./middleware/auth");
// const AmazonRouter = require('./routes/Scraper/amazonScrapper');
// const LazadaRouter = require('./routes/Scraper/LazadaScrapper')

const AmazonScrapper = require("./scrapper/amazonScrapper");
const LazadaScrapper = require("./scrapper/lazadaScrapper");
const shopeeScrapper = require("./scrapper/shopeeScrapper");
const qoo10Scrapper = require("./scrapper/qoo10Scrapper");
const AliPriceScrapper = require("./scrapper/alipriceScrapper");
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

app.post("/PriceTrends", auth, async (req, res) => {
  const { link } = req.body;
  res.set({
    "Access-Control-Allow-Origin": "*",
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

// serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use("/static", express.static(path.join(__dirname, "../build"))); // hopefully this works
  console.log("production mode activated");
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html")); // hopefully this is the right directionary
  });
}

app.listen(PORT, () => console.log(`Server Running at ${PORT}, Awesome!`));
