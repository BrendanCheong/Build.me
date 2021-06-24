const express = require('express');
const router = express.Router();
let Mobo = require('../models/Mobo.model');

function parser (item) {
    item.maxSupMem = parseFloat(item.maxSupMem.replace(' GB', ''))
    return item
}
router.post('/', async (req, res) => { // GET all Mobo
    try {
        const {itemSocket, memSpeed, maxSupMem, ramSlots, itemECC, itemInterface, formFactor} = req.body
        let query = {
            itemSocket: {$nin : []},
            memSpeed: {$nin: []},
            ramSlots: {$nin: []},
            itemECC: {$nin: []},
            sata6Gb: {$nin: []},
            m2Slots: {$nin: []}
        }
        
        if (itemSocket) {
            query.itemSocket = {$in: [itemSocket]}
        }
        if (memSpeed) {
            query.memSpeed = {$in: [memSpeed]}
        }
        if (ramSlots) {
            query.ramSlots = {$gte: ramSlots}
        }
        if (itemECC === 'Yes') {
            query.itemECC = {$in : [itemECC]}
        }
        if (itemInterface === "SATA 6 Gb/s") {
            query.sata6Gb = {$gte: 0}
        } 
        else if (itemInterface.slice(0,3) === "M.2") {
            query.m2Slots = {$elemMatch : { $regex: `.*${formFactor}.*`}}
        }

        const data = await Mobo.find(query)
        const processed = ((data.map((item) => parser(item))).filter((item) => parseInt(item.maxSupMem) >= maxSupMem))
        const response = processed.map((item) => {
            item.maxSupMem = item.maxSupMem + ' GB'
            return item
        })

        res
        .status(200)
        .json(response)

    } catch(err) {
        res
        .status(500)
        .json({Error: err})
    }
});

router.post('/add/all', (req, res) => {
    try {
        const payLoad = req.body;
        const sortedArr = payLoad.sort(function(a,b) {
            return parseFloat(b.ratingScore) - parseFloat(a.ratingScore)  
        })
        Mobo.collection.insertMany(sortedArr, function(err, reply) {
            if (err) {
                throw new Error('Adding Mobo Error')
            } else {
                res
                .status(200)
                .json(`Success! ${reply.insertedCount} Mobo added`)
            }
        })
    } catch(err) {
        res
        .status(500)
        .json({Error: err})
    }
})


router.get('/:id', (req, res) => { // GET SPEICIFC Mobo by id
    Mobo.findById(req.params.id)
    .then(mobo => res.json(mobo))
    .catch(err => res.status(400).json({Error : err}));
});


module.exports = router 