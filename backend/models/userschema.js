const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    corporatecode:String,
    email:String,
    password: String,
    uniquecode:String,
    points:[{
     game:String,
     points:Number
    }]
})

module.exports = mongoose.model('User', userschema)