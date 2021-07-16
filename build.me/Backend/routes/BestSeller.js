const express = require('express');
const router = express.Router();
const admin = require('../middleware/AdminAuth');
const auth = require("../middleware/auth");
const BestSeller = require('../models/Best.Seller.model');
const SchedulerAuth = require("../middleware/SchedulerAuth");

router.post("/", admin, async (req, res) => { // only admin can change monthly best sellers

    const Type = req.body.Type;
    const ProductName = req.body.ProductName
    const ProductURL = req.body.ProductURL
    const ProductTime= req.body.ProductTime
    const ProductPrices = req.body.ProductPrices
    const CurrentPrice = req.body.CurrentPrice
    const ProductImg = req.body.ProductImg
    const ProductRating = req.body.ProductRating

    const newBestSeller = new BestSeller({

        Type,
        ProductName,
        ProductURL,
        ProductTime,
        ProductPrices,
        CurrentPrice,
        ProductImg,
        ProductRating,
    })
    try {
        
        await newBestSeller.save();
        return res
        .status(200)
        .json({Success: "Adding to BestSeller succeeded"})

    } catch(err) {

        res
        .status(500)
        .json({Error: err})
    }

});

router.route('/update/:type').patch(SchedulerAuth, (req, res) => { // UPDATE SPECIFIC CPU by id and ENTER ALL new values/ params ** Uses a POST request **
    BestSeller.findOne({Type: req.params.type})
    .then(Product => {
        Product.Type = req.body.Type;
        Product.ProductName = req.body.ProductName;
        Product.ProductURL = req.body.ProductURL;
        Product.ProductTime = req.body.ProductTime;
        Product.ProductPrices = req.body.ProductPrices;
        Product.CurrentPrice = req.body.CurrentPrice;
        Product.ProductImg = req.body.ProductImg;
        Product.ProductRating = req.body.ProductRating;

        Product.save()
        .then(() => res.json({Success :'BestSeller updated successfully'}))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/:type", auth, async (req, res) => { // Get best sellers based on type: CPU,Motherboard,GPU,etc
    try {

        const Type = req.params.type;
        const data = await BestSeller.find({"Type": {
            $in: Type,
        }});
        res
        .status(200)
        .json(data);
    } catch(err) {

        res
        .status(500)
        .json({Error: err})
    }
})

module.exports = router;