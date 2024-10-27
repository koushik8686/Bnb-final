const express = require('express');
const Game = require('../../models/Gammeschema.js'); 
const Team = require('../../models/Teammodel.js');
const router = express.Router();
// Assuming the Game schema is defined in Team.js

// Route to get all games
router.get('/all', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games', error });
  }
});


router.get('/:game', async (req, res) => {
    try {
        const game = await Game.findById(req.params.game);
        if (!game) return res.status(404).json({ message: 'Game not found' });

        // Get all teams associated with the game
        const teamsWithImages = await Promise.all(
            game.teams.map(async (team) => {
                const teamData = await Team.findOne({ TeamCode: team.corporatecode });
                return {
                    ...team.toObject(), // Convert Mongoose document to plain object
                    image: teamData ? teamData.imgurl : null // Add image URL if the team exists
                };
            })
        );

        // Send the game details along with teams and their images
        res.json({ ...game.toObject(), teams: teamsWithImages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching game', error });
    }
});
module.exports =router