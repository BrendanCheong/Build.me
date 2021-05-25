const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// import router files
const CPURouter = require('./routes/CPUs');
const UserRouter = require('./routes/Users');
const CardRouter = require('./routes/Cards')


const app = express();

require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Hello from node.js!');
})

//BodyParser Middleware
app.use(cors());
app.use(express.json());

// Mongoose Middleware
const uri = process.env.ATLAS_URI; // uses the .env file for password and link to MongdDB
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
})


const PORT = process.env.PORT || 5000;

app.use('/CPUs', CPURouter); // these are my API end points in URLS
app.use('/users', UserRouter);
app.use('/Cards', CardRouter);


app.listen(PORT, () => console.log(`Server Running at ${PORT}, Awesome!`))