const express = require('express');
const router = express.Router();
let Storage = require('../models/Storage.model');

router.post('/add/all', (req, res) => {
    try {
        const payLoad = req.body;
        const sortedArr = payLoad.sort(function(a,b) {
            return parseFloat(b.ratingScore) - parseFloat(a.ratingScore)  
        })
        Storage.collection.insertMany(sortedArr, function(err, reply) {
            if (err) {
                throw new Error('Adding Storage Error')
            } else {
                res
                .status(200)
                .json(`Success! ${reply.insertedCount} Storage added`)
            }
        })
    } catch(err) {
        res
        .status(500)
        .json({Error: err})
    }
})

router.get('/', (req, res) => { // GET all Storage
    Storage.find()
    .then(storage => res.json(storage))
    .catch(err => res.status(400).json({Error : err}));
});

router.get('/:id', (req, res) => { // GET SPEICIFC Storage by id
    Storage.findById(req.params.id)
    .then(storage => res.json(storage))
    .catch(err => res.status(400).json({Error : err}));
});

module.exports = router 