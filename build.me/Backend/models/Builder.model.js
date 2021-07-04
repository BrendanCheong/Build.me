const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    isUncard: {type: Boolean, required: true},
    partsData: {type: Array, required: true},
    CardName: {type: String, sparse: true},
})

const BuilderSchema = new Schema({
    _id: {type: String, required: true},
    darkmode: {type: Boolean, required: true},
    CardArray: [CardSchema]
})

const Builder = mongoose.model('Builder',BuilderSchema);

module.exports = Builder;