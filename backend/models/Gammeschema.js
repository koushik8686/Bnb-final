// backend/models/Team.js
const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
   gameid:String,
    gamepicture:String,
    eventname:String,
    singleplayer:Boolean,
    multiplayer:Boolean,
    Date:String,
    start_time:String,
    end_time:String,
    pos1:String,
    pos2:String,
    pos3:String,
    status:String,
    judges:[{
      id:String,
      name:String,
    }],
    Location:String,
    number_of_players:Number,
    teams:[{
        corporatecode:String,
        points:Number,
        teamNickname:String,
        players:[{
          id:String,
          uniquecode:String
        }]
    }]
});

module.exports = mongoose.model('Games', GameSchema);