const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cpuDataSchema = new Schema({
    Type: {type: String},
    "Part Number": {type: String},
    Brand: {type: String},
    Model: {type: String},
    Rank: {type: String},
    Benchmark: {type: String},
    Samples: {type: String},
    URL: {type: String}
}, {collection : "cpuData"});

const cpuData = mongoose.model('cpuData', cpuDataSchema);
module.exports = cpuData;
