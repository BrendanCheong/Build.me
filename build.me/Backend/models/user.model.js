const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    email:{
        type: String, 
        required: true, // can have multiple accounts under one email
        sparse: true,
    },

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User