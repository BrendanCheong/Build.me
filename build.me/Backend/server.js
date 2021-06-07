const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// import router files
const CPURouter = require('./routes/CPUs');
const UserRouter = require('./routes/Users');
const CardRouter = require('./routes/Cards');
const BuilderRouter = require('./routes/Builder');
const AmazonScrapper = require('./scrapper/amazonScrapper');
const LazadaScrapper = require('./scrapper/lazadaScrapper');


const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

// make sure port 5000 is working
app.get('/', (req, res) => { 
    res.send('Hello from node.js!');
})

//BodyParser Middleware
app.use(cors({
    credentials: true, 
    origin: ['http://localhost:3000'], // only localhost 3000 can have cookies
}));
app.use(express.json());
app.use(cookieParser());

// Mongoose Middleware
const uri = process.env.ATLAS_URI; // uses the .env file for password and link to MongdDB
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,  useFindAndModify: false, },
    (err) => {
        if (err) return console.error(err)
    });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
})

// these are my API end points in URLS
app.use('/CPUs', CPURouter); 
app.use('/users', UserRouter);
app.use('/Cards', CardRouter);
app.use('/Builder',BuilderRouter)

// these are for ALL the SCRAPPERS
app.get('/Ascrapper/:id', async (req, res) => { // scraper just for AMAZON
    const input = (req.params.id).replace("%20", " ");
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'text/plain'
    })
    const answer = await AmazonScrapper.Ascrapper(input, 10) // fixed at 10 results
    // let answer = await LazadaScrapper.LazScrapper(input, 10) // lazada scrapper
    // answer = LazadaScrapper.lazExcludes(answer ,'itemName', 'Pre-Order') // excludes all items with pre order in name
    res.send(answer)
    
})

app.listen(PORT, () => console.log(`Server Running at ${PORT}, Awesome!`))