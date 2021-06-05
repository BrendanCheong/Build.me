const router = require('express').Router();
const Builder = require('../models/Builder.model')
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

        res.json(savedBuilder);
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
})

router.get('/',auth, async (req, res) => { // GET ALL Builders
    try {
        const AllBuilders = await Builder.find()
        res.json(AllBuilders)
    } catch(err) {
        console.error(err)
        res.status(500).send();
    }
})

router.get('/:id', async (req, res) => { // GET SPECIFIC Builder
    try {
        const BuilderById = await Builder.findById(req.params.id)

        res.json(BuilderById);
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
})

module.exports = router;