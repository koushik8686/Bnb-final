// backend/models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    TeamCode: { type: String },
    teamNickname: { type: String },
    password:String,
    imgurl:String,
    points:Number,
    members: [{ id: String , uniquecode: String }],
});

module.exports = mongoose.model('Team', teamSchema);