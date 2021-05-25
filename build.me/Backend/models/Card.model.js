const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CardSchema = new Schema({
    isUncard: {type: Boolean, required: true},
    partsData: {type: Array, required: true},
})

const Card = mongoose.model('Card',CardSchema);
module.exports = Card;