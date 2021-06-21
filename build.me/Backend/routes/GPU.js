const express = require('express');
const router = express.Router();
let GPU = require('../models/GPU.model');

router.post('/add', async (req, res) => { // adds 1 item at a time
    try {

        const itemChipset = req.body.itemChipset;
        const itemBrand = req.body.itemBrand;
        const coreClock = req.body.coreClock;
        const boostClock = req.body.boostClock;
        const itemMem = req.body.itemMem;
        const itemLen = req.body.itemLen;
        const itemTDP = req.body.itemTDP;

        const newGPU = new GPU({
            
            itemChipset,
            itemBrand,
            coreClock,
            boostClock,
            itemMem,
            itemLen,
            itemTDP,

        })

        const savedGPU = await newGPU.save()
        res.json(savedGPU)

    } catch(err) {
        res
        .status(500)
        .json({Error: err})
    }
})

router.post('/add/all', (req, res) => {
    try {
        const payLoad = req.body
        GPU.collection.insertMany(payLoad, function(err, reply) {
            if(err) {
                throw new Error("Adding GPU Error")
            } else {
                res
                .status(200)
                .json(`Success! ${reply.insertedCount} GPUs added to database!`)
            }
        })
    } catch(err) {
        res
        .status(500)
        .json({Error: err})
    }
})

module.exports = router;