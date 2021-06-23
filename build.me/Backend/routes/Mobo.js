const express = require('express');
const router = express.Router();
let Mobo = require('../models/Mobo.model');

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

router.get('/', (req, res) => { // GET SPEICIFC Mobo by id
    Mobo.find()
    .then(mobo => res.json(mobo))
    .catch(err => res.status(400).json({Error : err}));
});

router.get('/:id', (req, res) => { // GET SPEICIFC Mobo by id
    Mobo.findById(req.params.id)
    .then(mobo => res.json(mobo))
    .catch(err => res.status(400).json({Error : err}));
});


module.exports = router 