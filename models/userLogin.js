const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userLogin = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String
})

module.exports = mongoose.model('userLogin', userLogin)