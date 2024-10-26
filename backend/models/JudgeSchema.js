const mongoose = require('mongoose');

const JudgeSchema = mongoose.Schema({
    name:String,
    email:String,
    games:[{
        gameid:String
    }],
    password:String
})

module.exports = mongoose.model('Judges', JudgeSchema);