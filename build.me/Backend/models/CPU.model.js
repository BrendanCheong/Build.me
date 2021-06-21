const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CPUSchema = new Schema({
    itemName: {type: String, required: true},
    itemBrand: {type: String, required: true},
    coreCount: {type: String, required: true}, // assuming the data scraped is all in strings
    coreClock: {type: String, required: true},
    boostClock: {type: String, required: true},
    itemTDP: {type: String, required: true},
    itemSocket: {type: String, required: true},
    integratedGraphics: {type: String, required: true},
    maxSupMem: {type: String, required: true},

})

const CPU = mongoose.model('CPU', CPUSchema);
module.exports = CPU;