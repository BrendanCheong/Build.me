const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minlength: 3
    },

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User