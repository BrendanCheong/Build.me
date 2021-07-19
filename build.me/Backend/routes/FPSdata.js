const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const cpuData = require("../models/cpuData.model");
const gpuData = require("../models/gpuData.model");

router.get("/cpuData", auth, async (req, res) => {
    try {
        const response = await cpuData.find({})
        return res
        .status(200)
        .json(response)

    } catch(err) {
        res
        .status(500)
        .json({Error: err})
    }
});

router.get("/gpuData", auth, async (req, res) => {
    try {
        const response = await gpuData.find({})
        return res
        .status(200)
        .json(response)

    } catch(err) {
        res
        .status(500)
        .json({Error: err})
    }
});

module.exports = router