const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BestSellerSchema = new Schema({
    Type: { type: String, required: true},
    ProductName: { type: String, required: true},
    ProductURL: { type: String, required: true},
    ProductTime: {type: Array},
    ProductPrices : {type: Array},
    CurrentPrice: { type: String, required: true},
    ProductImg: { type: String, required: true},
    ProductRating: { type: String, required: true},
});

const BestSeller = mongoose.model("BestSeller", BestSellerSchema);
module.exports = BestSeller