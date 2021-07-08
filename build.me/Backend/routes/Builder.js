const router = require('express').Router();
const Builder = require('../models/Builder.model')
const Card = require("../models/Card.model");
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => { // POST NEW BUILDER
    try {
        const {darkmode, CardArray} = req.body
        const _id = req.user
        const newBuilder = new Builder({ // when posting, no need give id, its tied to a user's special cookie
            _id,
            darkmode,
            CardArray
        });

        const savedBuilder = await newBuilder.save();

        res
        .status(200)
        .json(savedBuilder);
    } catch(err) {
        console.error(err)
        res.status(500).send({Error:'Builder already exists'})
    }
})

router.get('/',auth, async (req, res) => { // GET ALL Builders
    try {
        const AllBuilders = await Builder.find()
        res
        .status(200)
        .json(AllBuilders)
    } catch(err) {
        console.error(err)
        res.status(500).send();
    }
})

router.get('/find', auth, async (req, res) => { // GET SPECIFIC Builder
    try {
        const BuilderById = await Builder.findById(req.user)

        res
        .status(200)
        .json(BuilderById);
    } catch(err) {
        console.error(err)
        res.status(500).send({Error:'Builder does not exist'})
    }
})

router.delete('/:id', auth, async (req, res) => { // DELETE specific card in CardArray from Builders
    try {
        const response = await Builder.findOneAndUpdate(
            {_id:req.user},
            {$pull:{CardArray:{_id:req.params.id}}})

        if (response) res.status(200).json("Card Deleted successfully")
    } catch(err) {
        console.error(err)
        res.status(500).send({Error: 'Failed to delete'})
    }
})

router.get('/delete', auth, (req, res) => { // DELETE BUILDER completely
    Builder.deleteOne({_id: req.user})
    .then(() => res.status(200).json("Builder Deleted successfully"))
    .catch((err) => res.status(500).json('Error: ' + err))
})

router.patch('/:id', auth, async (req, res) => { // UPDATE SPECIFIC Card's partsData using Cookie and Card Id
    try {
        const BuilderById = await Builder.findById(req.user)
        for (let Card of BuilderById.CardArray) {
            if (Card._id.toString() === req.params.id) {
                Card.partsData = req.body.partsData // payload must be in the {partsData: blah blah }
                break;
            }
        }
        BuilderById.save()
        res
        .status(200)
        .json("PartsData updated successfully")

    } catch(err) {
        console.error(err)
        res.status(500).send({Error: "Failed to update"})
    }
})

router.patch('/CardName/:id', auth, async (req, res) => { // UPDATE SPECIFIC Card's CardName using Cookie and Card Id
    try {
        const BuilderById = await Builder.findById(req.user)
        for (let Card of BuilderById.CardArray) {
            if (Card._id.toString() === req.params.id) {
                Card.CardName = req.body.CardName // payload must be in the "string"
                break;
            }
        }
        await BuilderById.save()
        res
        .status(200)
        .json("CardName updated successfully")

    } catch(err) {
        console.error(err)
        res.status(500).send({Error: "Failed to update"})
    }
})

router.put('/addCard', auth, async (req, res) => { // adds a Card to CardArray of particular Builder
    try {
        const BuilderById = await Builder.findById(req.user);
        const isUncard = req.body.isUncard;
        const partsData = req.body.partsData;
        const CardName = req.body.CardName;

        const newCard = new Card({
            isUncard,
            partsData,
            CardName,
        });

        BuilderById.CardArray.push(newCard)
        BuilderById.save()
        res
        .status(200)
        .json(BuilderById)

    } catch(err) {
        console.error(err)
        res.status(500).send({Error: "Failed to Post"})
    }
})

module.exports = router;