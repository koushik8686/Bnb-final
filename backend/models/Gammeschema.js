// backend/models/Team.js
const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    eventname:String,
    singleplayer:Boolean,
    multiplayer:Boolean,
    Date:Date,
    start_time:Date,
    end_time:Date,
    winner:String,
    loser:String,
    status:String,
    Location:String,
    teams:[{
        corporatecode:String,
        points:Number,
        teamNicknam:String,
    }]
});

module.exports = mongoose.model('Team', GameSchema);