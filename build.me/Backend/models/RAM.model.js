const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RAMSchema = new Schema({
    
    itemName: {type: String, required: true},
    itemBrand: {type: String, required: true},
    ratingScore: {type: String, required: true}, // assuming the data scraped is all in strings
    memModule: {type: String, required: true},
    memSpeed: {type: String, required: true},
    itemTiming: {type: String, required: true},
    itemEccRegistered: {type: String, required: true},
    itemCasLatency: {type: String, required: true},
    firstWordLatency: {type: String, required: true},

})

const RAM = mongoose.model('RAM', RAMSchema);
module.exports = RAM;