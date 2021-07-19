const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gpuDataSchema = new Schema({
    Type: {type: String},
    "Part Number": {type: String},
    Brand: {type: String},
    Model: {type: String},
    Rank: {type: String},
    Benchmark: {type: String},
    Samples: {type: String},
    URL: {type: String}
}, {collection : "gpuData"});

const cpuData = mongoose.model('gpuData', gpuDataSchema);
module.exports = cpuData;
