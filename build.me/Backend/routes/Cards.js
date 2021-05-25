const router = require('express').Router();
let Card = require('../models/Card.model');

router.route('/').get((req, res) => {
    Card.find()
        .then(Cards => res.json(Cards))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => { // POST a card
    const isUncard = req.body.isUncard
    const partsData = req.body.partsData

    const newCard = new Card({
        isUncard,
        partsData,
    });

    newCard.save()
        .then(() => res.json('Another Card for my Collection!'))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').get((req, res) => { // GET SPEICIFC Card by id
    Card.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => { // DELETE SPECIFIC Card by id
    Card.findByIdAndDelete(req.params.id)
    .then(() => res.json('Poof! Card removed successfully'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => { // UPDATE SPECIFIC CPU by id and ENTER ALL new values/ params ** Uses a POST request **
    Card.findById(req.params.id)
    .then(card => {
        card.isUncard = req.body.isUncard;
        card.partsData = req.body.partsData;

        card.save()
        .then(() => res.json('Card updated successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;