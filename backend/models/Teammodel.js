// backend/models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    TeamCode: { type: String, required: true },
    teamNickname: { type: String, required: true },
    password:String,
    members: [{ id: String , uniquecode: String }],
});

module.exports = mongoose.model('Team', teamSchema);