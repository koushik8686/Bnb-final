const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    corporatecode:String,
    email:String,
    password: String,
    age:Number,
    uniquecode:String,
    points:[{
     game:String,
     points:Number,
     calories:Number
    }],
    certificates:[{
        name:String,
        position:Number,
        event:String
    }]
})

//user
module.exports = mongoose.model('User', userschema)