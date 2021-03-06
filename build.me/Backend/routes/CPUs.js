const express = require('express');
const router = express.Router();
const admin = require('../middleware/AdminAuth');
let CPU = require('../models/CPU.model');

function parser (item) {
    item.maxSupMem = parseFloat(item.maxSupMem.replace(' GB', ''))
    return item
}

router.post('/', async (req, res) => { // GET ALL CPUs
    try {
        const { maxSupMem, itemSocket } = req.body
        let query = {}
        if (!itemSocket) {
            query['$nin'] = []
        } else {
            query['$in'] = [itemSocket]
        }
        const data = await CPU.find({"itemSocket": query})
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

router.post('/add/all', admin, (req, res) => {
    try {
        const payLoad = req.body
        const sortedArr = payLoad.sort(function(a,b) {
            return parseFloat(b.ratingScore) - parseFloat(a.ratingScore)  
        })
        CPU.collection.insertMany(sortedArr, function(err, reply) {
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


router.route('/add').post(admin, (req, res) => { // POST 1 new CPU with exact specifications
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

router.get('/:id', (req, res) => { // GET SPEICIFC CPU by id
    CPU.findById(req.params.id)
    .then(cpu => res.json(cpu))
    .catch(err => res.status(400).json({Error : err}));
});

router.route('/:id').delete(admin, (req, res) => { // DELETE SPECIFIC CPU by id
    CPU.findByIdAndDelete(req.params.id)
    .then(() => res.json('CPU deleted successfully!.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(admin, (req, res) => { // UPDATE SPECIFIC CPU by id and ENTER ALL new values/ params ** Uses a POST request **
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
router.patch('/:id', admin, async (req, res) => {
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