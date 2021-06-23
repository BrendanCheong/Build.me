const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
// import router files
const CPURouter = require('./routes/CPUs');
const GPURouter = require('./routes/GPU');
const UserRouter = require('./routes/Users');
const CardRouter = require('./routes/Cards');
const RAMRouter = require('./routes/RAM');
const MoboRouter = require('./routes/Mobo');
const BuilderRouter = require('./routes/Builder');
const AmazonRouter = require('./routes/Scraper/amazonScrapper');
const LazadaRouter = require('./routes/Scraper/LazadaScrapper')


const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

// make sure port 5000 is working
app.get('/', (req, res) => { 
    res.send('Hello from node.js!');
})
// view engine set-up for express handlebars for html parsing
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//BodyParser Middleware
app.use(cors({
    credentials: true, 
    origin: ['http://localhost:3000'], // only localhost 3000 can have cookies !!! REMEMBER TO REPLACE with Hosted Service!!!
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
app.use('/GPUs', GPURouter); 
app.use('/users', UserRouter);
app.use('/Cards', CardRouter);
app.use('/Builder',BuilderRouter)
app.use('/RAMs', RAMRouter);
app.use('/Mobos', MoboRouter);
app.use('/Ascrapper',AmazonRouter);
app.use('/LazadaScrapper', LazadaRouter);



app.listen(PORT, () => console.log(`Server Running at ${PORT}, Awesome!`))