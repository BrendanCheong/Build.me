const express = require('express');
const router = express.Router();
let RAM = require('../models/RAM.model');

router.post('/add/all', (req, res) => {
    try {
        const payLoad = req.body;
        const sortedArr = payLoad.sort(function(a,b) {
            return parseFloat(b.ratingScore) - parseFloat(a.ratingScore)  
        })
        RAM.collection.insertMany(sortedArr, function(err, reply) {
            if (err) {
                throw new Error('Adding RAM Error')
            } else {
                res
                .status(200)
                .json(`Success! ${reply.insertedCount} RAM added`)
            }
        })
    } catch(err) {
        res
        .status(500)
        .json({Error: err})
    }
})

router.post('/add', async (req, res) => { // adds 1 item at a time
    try {

        const itemName = req.body.itemName;
        const itemBrand = req.body.itemBrand;
        const ratingScore = req.body.ratingScore;
        const memModule = req.body.memModule;
        const memSpeed = req.body.memSpeed;
        const itemTiming = req.body.itemTiming;
        const itemEccRegistered = req.body.itemEccRegistered;
        const itemCasLatency = req.body.itemCasLatency;
        const firstWordLatency = req.body.firstWordLatency;

        const newRAM = new RAM({
            
        itemName,
        itemBrand,
        ratingScore,
        memModule,
        memSpeed,
        itemTiming,
        itemEccRegistered,
        itemCasLatency,
        firstWordLatency,

        })

        const savedRAM = await newRAM.save()
        res.json(savedRAM)

    } catch(err) {
        res
        .status(500)
        .json({Error: err})
    }
})

module.exports = router;