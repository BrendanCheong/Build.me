const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GPUSchema = new Schema({
    itemChipSet: {type: String, required: true},
    itemBrand: {type: String, required: true},
    coreClock: {type: String, required: true},
    boostClock: {type: String, required: true},
    itemMem: {type: String, required: true},
    itemLen: {type: String, required: true},
    itemTDP: {type: String, required: true},

})

const GPU = mongoose.model('GPU', GPUSchema);
module.exports = GPU;