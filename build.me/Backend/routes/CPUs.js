const router = require('express').Router();
let CPU = require('../models/CPU.model');

router.route('/').get((req, res) => {
    CPU.find()
        .then(CPUS => res.json(CPUS))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    const Brand = req.body.Brand
    const Name = req.body.Name
    const Core_Count = req.body.Core_Count
    const Core_Clock = req.body.Core_Clock
    const Boost_Clock = req.body.Boost_Clock 
    const Integrated_Graphics = req.body.Integrated_Graphics
    const TDP = req.body.TDP
    const Socket = req.body.Socket
    const Max_Memory = req.body.Max_Memory

    const newCPU = new CPU({ // here is what Im suppose to add
        Brand,
        Name,
        Core_Count,
        Core_Clock,
        Boost_Clock,
        Integrated_Graphics,
        TDP,
        Socket,
        Max_Memory,
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
        cpu.Brand = req.body.Brand;
        cpu.Name = req.body.Name;
        cpu.Core_Count = req.body.Core_Count;
        cpu.Core_Clock = req.body.Core_Clock;
        cpu.Boost_Clock = req.body.Boost_Clock;
        cpu.Integrated_Graphics = req.body.Integrated_Graphics;
        cpu.TDP = req.body.TDP;
        cpu.Socket = req.body.Socket;
        cpu.Max_Memory = req.body.Max_Memory;

        cpu.save()
        .then(() => res.json('CPU updated successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;