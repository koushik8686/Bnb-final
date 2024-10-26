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

//user
module.exports = mongoose.model('User', userschema)