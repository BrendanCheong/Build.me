const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoboSchema = new Schema({
    
    itemName: {type: String, required: true},
    itemBrand: {type: String, required:true},
    ratingScore: {type: String, required: true},
    itemSocket: {type: String, required: true},
    memType: {type: String, required: true},
    memSpeed: [{type: String}],
    maxSupMem: {type: String},
    ramSlots: {type: String},
    m2Slots: [{type: String}],
    mSataSlots: {type: String},
    itemECC: {type: String},

})

const Mobo = mongoose.model('Mobo', MoboSchema);
module.exports = Mobo;