const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CPUSchema = new Schema({
    Brand: {type: String, required: true},
    Name: {type: String, required: true},
    Core_Count: {type: String, required: true}, // assuming the data scraped is all in strings
    Core_Clock: {type: String, required: true},
    Boost_Clock: {type: String, required: true},
    Integrated_Graphics: {type: String, required: true},
    TDP: {type: String, required: true},
    Socket: {type: String, required: true},
    Max_Memory: {type: String, required: true},

})

const CPU = mongoose.model('CPU', CPUSchema);
module.exports = CPU;