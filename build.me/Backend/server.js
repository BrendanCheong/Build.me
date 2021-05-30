const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// import router files
const CPURouter = require('./routes/CPUs');
const UserRouter = require('./routes/Users');
const CardRouter = require('./routes/Cards');
const AmazonScrapper = require('./scrapper/amazonScrapper');


const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

// make sure port 5000 is working
app.get('/', (req, res) => { 
    res.send('Hello from node.js!');
})

//BodyParser Middleware
app.use(cors());
app.use(express.json());

// Mongoose Middleware
const uri = process.env.ATLAS_URI; // uses the .env file for password and link to MongdDB
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,  useFindAndModify: false, }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
})

// these are my API end points in URLS
app.use('/CPUs', CPURouter); 
app.use('/users', UserRouter);
app.use('/Cards', CardRouter);

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
    res.send(answer)
    
})

app.listen(PORT, () => console.log(`Server Running at ${PORT}, Awesome!`))