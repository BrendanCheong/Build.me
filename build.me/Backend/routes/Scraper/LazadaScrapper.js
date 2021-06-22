const express = require('express');
const LazadaScrapper = require('../../scrapper/lazadaScrapper')
const router = express.Router();

router.get('/:id', async (req, res) => {
    const input = decodeURIComponent(req.params.id)
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'text/plain'
    })

    try {

    const answer = await LazadaScrapper.LazScrapper(input, 10) // lazada scrapper
    // answer = LazadaScrapper.lazExcludes(answer ,'itemName', 'Pre-Order') // excludes all items with pre order in name
    res.send(answer)

    } catch(err) {
        res
        .status(500)
        .json({Error : err})
    }
})

module.exports = router;