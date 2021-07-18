const express = require('express');
const router = express.Router();
const admin = require('../middleware/AdminAuth');
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

router.post('/add/all', admin, (req, res) => {
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

// GET ALL GPUS
router.get('/', async (req, res) => {
    try {

        const response = await GPU.find()
        res
        .status(200)
        .send(response)

    } catch(err) {

        res
        .status(500)
        .json({Error : err})

    }
})

router.get('/:id', (req, res) => { // GET SPEICIFC GPU by id
    GPU.findById(req.params.id)
    .then(gpu => res.json(gpu))
    .catch(err => res.status(400).json({Error : err}));
});

module.exports = router;