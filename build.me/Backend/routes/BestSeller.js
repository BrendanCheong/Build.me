const express = require('express');
const router = express.Router();
const admin = require('../middleware/AdminAuth');
const auth = require("../middleware/auth");
const BestSeller = require('../models/Best.Seller.model');

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

router.patch("/:type", admin, (req, res) => { // update the monthly best Seller according to type: CPU,Motherboard,GPU,etc

        const PartType = req.params.type;
        BestSeller.find({"Type": {
            $in: PartType,
        }}).then((product) => {
            product.Type = req.body.Type;
            product.ProductName = req.body.ProductName;
            product.ProductURL = req.body.ProductURL;
            product.ProductTime = req.body.ProductTime;
            product.ProductPrices = req.body.ProductPrices;
            product.CurrentPrice = req.body.CurrentPrice;
            product.ProductImg = req.body.ProductImg;
            product.ProductRating = req.body.ProductRating;

            product.save()
            .then(() => res.status(200).json({Success: "BestSeller Updated successfully"}))
            .catch((err) => res.status(500).json({Error: err}));
        })
        .catch((err) => res.status(500).json({Error: err}));

})

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