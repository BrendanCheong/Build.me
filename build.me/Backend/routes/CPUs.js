const express = require('express');
const router = express.Router();
let CPU = require('../models/CPU.model');

router.route('/').get((req, res) => { // GET ALL CPUs
    CPU.find()
        .then(CPUS => res.json(CPUS))
        .catch(err => res.status(400).json('Error' + err));
});

router.post('/add/all', (req, res) => {
    try {
        const payLoad = req.body
        CPU.collection.insertMany(payLoad, function(err, reply) {
            if(err) {
                throw new Error("Adding CPU Error")
            } else {
                res
                .status(200)
                .json(`Success! ${reply.insertedCount} CPUs added to database!`)
            }
        })
    } catch(err) {
        res
        .status(500)
        .json({Error: err})
    }
})

router.route('/add').post((req, res) => { // POST 1 new CPU with exact specifications
    const itemName = req.body.itemName
    const itemBrand = req.body.itemBrand
    const coreCount = req.body.coreCount
    const coreClock = req.body.coreClock
    const boostClock = req.body.boostClock
    const itemTDP = req.body.itemTDP
    const itemSocket = req.body.itemSocket
    const integratedGraphics = req.body.integratedGraphics
    const maxSupMem = req.body.maxSupMem

    const newCPU = new CPU({ // here is what Im suppose to add
        itemName,
        itemBrand,
        coreCount,
        coreClock,
        boostClock,
        itemTDP,
        itemSocket,
        integratedGraphics,
        maxSupMem,
    });

    newCPU.save() // POST new CPU based on params
        .then(() => res.json('CPU added to Collection!'))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').get((req, res) => { // GET SPEICIFC CPU by id
    CPU.findById(req.params.id)
    .then(cpu => res.json(cpu))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => { // DELETE SPECIFIC CPU by id
    CPU.findByIdAndDelete(req.params.id)
    .then(() => res.json('CPU deleted successfully!.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => { // UPDATE SPECIFIC CPU by id and ENTER ALL new values/ params ** Uses a POST request **
    CPU.findById(req.params.id)
    .then(cpu => {
        cpu.itemName = req.body.itemName;
        cpu.itemBrand = req.body.itemBrand;
        cpu.coreCount = req.body.coreCount;
        cpu.coreClock = req.body.coreClock;
        cpu.boostClock = req.body.boostClock;
        cpu.itemTDP = req.body.itemTDP;
        cpu.itemSocket = req.body.itemSocket;
        cpu.integratedGraphics = req.body.integratedGraphics;
        cpu.maxSupMem = req.body.maxSupMem;

        cpu.save()
        .then(() => res.json('CPU updated successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//  PATCH request
// UPDATE SPECIFIC CPU based on ID
router.patch('/:id', async (req, res) => {
    try {
        const cpu = await CPU.findByIdAndUpdate(req.params.id, req.body);
        if(!cpu) {
            throw Error('Something went wrong when patching :(');

        }   res.status(200).json('Specific CPU patched successfully!')

    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
})

module.exports = router;