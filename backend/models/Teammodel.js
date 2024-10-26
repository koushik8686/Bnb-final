// backend/models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    TeamCode: { type: String, required: true },
    teamNickname: { type: String, required: true },
    members: [{ id: String , corporatecode: String }],
});

module.exports = mongoose.model('Team', teamSchema);