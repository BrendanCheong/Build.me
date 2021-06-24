const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorageSchema = new Schema({
    itemName:{type: String, required: true},
    itemBrand:{type: String, required: true},
    ratingScore:{type: String, required: true},
    itemCapacity:{type: String, required: true},
    itemType:{type: String, required: true},
    itemInterface:{type: String, required: true},
    formFactor:{type: String, required: true},
    itemCache:{type: String, required: true}
})
const Storage = mongoose.model('Storage', StorageSchema);
module.exports = Storage
