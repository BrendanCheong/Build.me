const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PSUSchema = new Schema({

    itemName:{type: String, required: true},
    itemBrand:{type: String, required: true},
    ratingScore:{type: String, required: true},
    itemWattage:{type: String, required: true},
    formFactor:{type: String, required: true},
    effRating:{type: String, required: true},
    itemModularity:{type: String, required: true},
    itemLength:{type: String, required: true},
})

const PSU = mongoose.model('PSU', PSUSchema);
module.exports = PSU