const express = require('express');
const router = express.Router();
const admin = require('../middleware/AdminAuth');
let PSU = require('../models/PSU.model');

router.post('/add/all', admin, (req, res) => {
    try {
        const payLoad = req.body;
        const sortedArr = payLoad.sort(function(a,b) {
            return parseFloat(b.ratingScore) - parseFloat(a.ratingScore)  
        })
        PSU.collection.insertMany(sortedArr, function(err, reply) {
            if (err) {
                throw new Error('Adding PSU Error')
            } else {
                res
                .status(200)
                .json(`Success! ${reply.insertedCount} PSU added`)
            }
        })
    } catch(err) {
        res
        .status(500)
        .json({Error: err})
    }
})

router.get('/', (req, res) => { // GET all PSU
    PSU.find()
    .then(psu => res.json(psu))
    .catch(err => res.status(400).json({Error : err}));
});

router.get('/:id', (req, res) => { // GET SPEICIFC PSU by id
    PSU.findById(req.params.id)
    .then(psu => res.json(psu))
    .catch(err => res.status(400).json({Error : err}));
});

module.exports = router 