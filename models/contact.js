var mongoose = require('mongoose')
var Schema = mongoose.Schema

var contacts = new Schema({
    email: String,
    contact: [{
        phone: Number,
        name: String
    }]
})

module.exports = mongoose.model('contact', contacts)