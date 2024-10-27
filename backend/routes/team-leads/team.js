const express = require('express');
const companymodel = require('../../models/Teammodel');
const router = express.Router();
const Usermodel = require('../../models/userschema');
const Game = require('../../models/Gammeschema');
router.post('/login', async (req, res) => {
  console.log(req.body);
  const { TeamCode, password } = req.body; 
    
    try {
   
      // Find company by email
      const company = await companymodel.findOne({ TeamCode:TeamCode });
      if (!company) return res.status(400).json({ error: 'companymodel not found' });
     console.log( company.password , password);
      // Directly compare passwords without encryption
      if (password !== company.password) {
        return res.status(400).json({ error: 'Invalid password' });
      }
      res.status(200).json({ message: 'Login successful' , company : company._id});
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Failed to log in' });
    }
  });

router.get('/getgames' , function (req , res) { 
    Game.find().then((arr)=>{
        res.send(arr);
    })
 })

router.get("/getteam/:id" , function (req, res) {
    companymodel.findById(req.params.id).then((company)=>{
        res.send(company.members);
    })
}) 
router.get("/getcode/:id" , function (req, res) {
    companymodel.findById(req.params.id).then((company)=>{
        res.send(company.TeamCode);
    })
}) 
router.get('/getgames/:id', async (req, res) => {
    try {
        const games = [];
        
        // Find the company by its ID
        const company = await companymodel.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        
        // Find all games and filter those that match the company's TeamCode
        const allGames = await Game.find();
        allGames.forEach(game => {
            game.teams.forEach(team => {
                console.log(team.corporatecode , company.TeamCode);
                console.log(team.corporatecode == company.TeamCode);
                
                if (team.corporatecode.trim().toUpperCase() === company.TeamCode.trim().toUpperCase()) {
                    games.push(game);
                }
                
            });
        });

        // Return the matching games
        res.json(games);
    } catch (error) {
        console.error('Error retrieving games:', error);
        res.status(500).json({ message: 'Error retrieving games', error: error.message });
    }
});

router.post('/register' , function (req, res) {
const { corporateCode, companyNickname, gameId, teamPlayers } = req.body;
console.log(req.body);

Game.findById(gameId)
  .then(game => {
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Update the game with the new team
    game.teams.push({
      corporatecode: corporateCode,
      teamNickname: companyNickname,
      points: 0,
      players: teamPlayers
    });

    game.save()
      .then(() => res.status(200).json({ message: 'Team registered successfully' }))
      .catch(error => {
        console.error('Error registering team:', error);
        res.status(500).json({ error: 'Failed to register team' });
      });
  })
  .catch(error => {
    console.error('Error finding game:', error);
    res.status(500).json({ error: 'Failed to find game' });
  });
})

router.get('/getteams' , function(req, res) {
    companymodel.find().then((arr)=>{
        res.send(arr);
    })
})
router.get('/mvp/:code', async (req, res) => {
    try {
        // Fetch users with the specified corporate code
        const users = await Usermodel.find({ corporatecode: req.params.code });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found for this corporate code.' });
        }

        // Calculate total points for each user
        const usersWithPoints = users.map(user => ({
            ...user.toObject(), // Convert Mongoose document to plain object
            totalPoints: user.points.reduce((acc, point) => acc + point.points, 0) // Sum points
        }));

        // Sort users by total points in descending order and get the top 3
        const topUsers = usersWithPoints
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .slice(0, 3); // Get top 3 users

        res.json(topUsers); // Send the top users as a response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports =router
