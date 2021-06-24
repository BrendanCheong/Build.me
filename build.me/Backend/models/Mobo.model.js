const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoboSchema = new Schema({
    
    itemName: {type: String, required: true},
    itemBrand: {type: String, required:true},
    ratingScore: {type: String, required: true},
    itemSocket: {type: String, required: true},
    memType: {type: String, required: true},
    memSpeed: [{type: String, required: true}],
    maxSupMem: {type: String, required: true},
    ramSlots: {type: Number, required: true},
    m2Slots: [{type: String, required: true}],
    sata6Gb: {type: Number, required: true},
    itemECC: {type: String, required: true},

})

const Mobo = mongoose.model('Mobo', MoboSchema);
module.exports = Mobo;