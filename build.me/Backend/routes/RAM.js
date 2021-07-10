const express = require('express');
const router = express.Router();
const admin = require('../middleware/AdminAuth');
let RAM = require('../models/RAM.model');


router.post('/add/all', admin, (req, res) => {
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

router.post('/', async (req, res) => { 
    try {
        const {memSpeed, totalMem, moduleNum, itemEccRegistered} = req.body
        let query = {

            itemEccRegistered: {$nin: []},
            moduleNum: {$nin: []},
            memSpeed: {$nin: []},
            totalMem: {$nin: []},

        }

        if (memSpeed) {
            query.memSpeed = {$in: memSpeed}
        }

        if (totalMem) {
            query.totalMem = {$lte: totalMem}
        }

        if (moduleNum) {
            query.moduleNum = {$lte: moduleNum}
        }

        if (itemEccRegistered) {
            query.itemEccRegistered = {$in: itemEccRegistered}
        }

        const response = await RAM.find(query)
        res
        .status(200)
        .json(response)

    } catch(err) {

        res
        .status(500)
        .json({Error: err})
    }
});

router.post('/add', admin, async (req, res) => { // adds 1 item at a time
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
        const totalMem = req.body.totalMem;
        const moduleNum = req.body.moduleNum;

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
        totalMem,
        moduleNum,

        })

        const savedRAM = await newRAM.save()
        res.json(savedRAM)

    } catch(err) {
        res
        .status(500)
        .json({Error: err})
    }
})

router.get('/', admin, (req, res) => { // FIND ALL RAM
    RAM.find()
    .then(ram => res.json(ram))
    .catch(err => res.status(400).json({Error : err}));
});

router.get('/:id', (req, res) => { // GET SPEICIFC RAM by id
    RAM.findById(req.params.id)
    .then(ram => res.json(ram))
    .catch(err => res.status(400).json({Error : err}));
});
module.exports = router;