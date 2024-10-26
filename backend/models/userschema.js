const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    corporatecode:String,
    email:String,
    password: String,
    age:Number,
    uniquecode:String,
    points:[{
     game:String,
     points:Number
    }],
    certificates:[{
        name:String,
        position:Number,
        evevent:String
    }]
})

//user
module.exports = mongoose.model('User', userschema)