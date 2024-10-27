const router = require('express').Router();
const Judge = require('../../models/JudgeSchema');
const Games = require('../../models/Gammeschema');
const Teammodel = require('../../models/Teammodel');
const Usermodel= require('../../models/userschema');
const axios = require('axios');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if judge already exists by email
        const existingJudge = await Judge.findOne({ email });
        if (existingJudge) {
            return res.status(400).json({ message: 'Judge already exists' });
        }
        // Hash the password before saving
        // Create new judge
        const judge = new Judge({
            name,
            email,
            password: password
        });

        await judge.save();

        res.status(201).json({ message: 'Judge registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering judge' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email , password);
        
        // Find judge by email
        const judge = await Judge.findOne({ email });
        if (!judge) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check password
        if (password==judge.password) {
            return res.status(200).json({ message: 'Login successful'  ,id:judge._id });
        }else{
          return res.status(500).json({ message: 'Invalid credentials' });
        }
        // Create token
        

        res.json({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

router.get('/getgames/:id', async (req, res) => {
    const games =[]

        const judge = await Judge.findOne({ _id: req.params.id }); // Use _id for MongoDB documents
        if (!judge) {
            return res.status(404).json({ message: 'Judge not found' });
        }
        // Query games where the judges array contains an object with the matching id        
        await Games.find().then((arr)=>{
            arr.forEach(Game => {
            Game.judges.forEach(jud => {
                    console.log(String(jud._id) ,String(judge._id));
                    if(String(jud._id) === String(judge._id)){
                        games.push(Game)
                    }
                });
            });
        });
        
        console.log(games);
    res.send(games);

});

router.get('/getgamecompanydetails/:id' , function(req, res) {
    Games.findById(req.params.id)
   .then(Game => {
    res.send(Game);
   })
})

var foundGame = ""

const updateScores = async (teamCode, place) => {
    const scoreIncrement = place === 'first' ? 5 : place === 'second' ? 3 : 1;

    // Check if foundGame is defined
    if (!foundGame) {
        console.error('foundGame is not defined.');
        return;
    }

    console.log(`Looking for team with code: ${teamCode}`);

    // Create a copy of the teams array for updating
    const updatedTeams = foundGame.teams.map(team => {
        if (team.corporatecode.trim().toLowerCase() === teamCode.trim().toLowerCase()) {
            // Update the points and return the modified team object
            team.points = (team.points || 0) + scoreIncrement; // Initialize points if it doesn't exist
            return team; // Return updated team
        }
        return team; // Return original team if no match
    });
    // Find if the team was found and updated
    const teamFound = updatedTeams.some(team => team.corporatecode.trim().toLowerCase() === teamCode.trim().toLowerCase());

    if (teamFound) {
        // Update the Game in the database with the modified teams array
        const updateResult = await Games.updateOne({ _id: foundGame._id }, { $set: { teams: updatedTeams } });
        console.log("Added Points for round");
        
    } else {
        console.error(`Team with code ${teamCode} not found in Game.`);
    }
};

const user_updatescores = async (teamCode, place, gameId) => {
    const scoreIncrement = place === 'first' ? 5 : place === 'second' ? 3 : 1;
    console.log(scoreIncrement, gameId);
    // Find the team by code
    const team = await Teammodel.findOne({ TeamCode: teamCode });
    if (team) {
        // Add points for the place
        team.points += scoreIncrement;
        
        // Find the Game by ID to get calories
        const game = await Games.findOne({ _id: gameId });
        if (!game) {
            console.error(`Game with ID ${gameId} not found.`);
            return;
        }
        
        // Iterate through each member of the team
        for (const member of team.members) {
            // Find the user by their unique code
            const user = await Usermodel.findOne({ uniquecode: member.uniquecode });
            if (user) {
                // Calculate calories burned based on user age
                const startTime = new Date(game.start_time);
                const endTime = new Date(game.end_time);
                
                // Calculate playtime in seconds
                const playtime = Math.floor((endTime - startTime) / 1000).toString();
                const userAge = user.age.toString();
                
                // Send request to Flask API for calorie prediction
                fetch('http://127.0.0.1:5000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        age: userAge,
                        playtime: playtime
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    let predictedCalories = data.predicted_calories;
                
                    // Use predicted calories or a reasonable fallback based on playtime
                    const caloriesForUser = predictedCalories || (playtime * 0.5); // Example fallback
                
                    // Check if the user already has points for this Game
                    const existingPointEntry = user.points.find(p => p.Game === gameId);
                    if (existingPointEntry) {
                        // Update points and calories
                        existingPointEntry.points += scoreIncrement;
                        existingPointEntry.calories += caloriesForUser;
                    } else {
                        // If not, push a new point entry
                        user.points.push({
                            Game: gameId,
                            points: scoreIncrement,
                            calories: caloriesForUser
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                
                    // Apply fallback calculation if there is an error
                    const fallbackCalories = playtime * 0.5; // Example fallback based on playtime
                    const existingPointEntry = user.points.find(p => p.Game === gameId);
                    if (existingPointEntry) {
                        existingPointEntry.points += scoreIncrement;
                        existingPointEntry.calories += fallbackCalories;
                    } else {
                        user.points.push({
                            Game: gameId,
                            points: scoreIncrement,
                            calories: fallbackCalories
                        });
                    }
                });
                
                await user.save();
                console.log(`Scores updated for user ${user.email} in team ${teamCode}.`);
            } else {
                console.error(`User with unique code ${member.uniquecode} not found.`);
            }
        }
    } else {
        console.error(`Team with code ${teamCode} not found in Game.`);
    }
};

router.post("/submitround", async (req, res) => {
    const { game, selectedWinners } = req.body;
    try {
        // Find the Game by its ID
         foundGame = await Games.findById(game);
        if (!foundGame) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Update scores for the winning teams
        
        // Update player scores in the userschema
        // Process the winners
        await updateScores(selectedWinners.first.trim(), 'first');
        await updateScores(selectedWinners.second.trim(), 'second');
        await updateScores(selectedWinners.third.trim(), 'third');
        await user_updatescores(selectedWinners.first.trim(), 'first', foundGame._id);
        await user_updatescores(selectedWinners.second.trim(), 'second', foundGame._id);
        await user_updatescores(selectedWinners.third.trim(), 'third', foundGame._id);

        res.status(200).json({ message: 'Round submitted successfully' });
    } catch (error) {
        console.error('Error submitting round:', error);
        res.status(500).json({ message: 'Failed to submit round' });
    }
});

router.post('/submitgame', async (req, res) => {
    console.log("submit route");
    const { game, selectedWinners } = req.body;
    try {
        // Find the Game by its ID
         foundGame = await Games.findById(game);
        if (!foundGame) {
            return res.status(404).json({ message: 'Game not found' });
        }
        // Update scores for the winning teams
        
        // Update player scores in the userschema
        // Process the winners
        await updateScores(selectedWinners.first.trim(), 'first');
        await updateScores(selectedWinners.second.trim(), 'second');
        await updateScores(selectedWinners.third.trim(), 'third');
        await user_updatescores(selectedWinners.first.trim(), 'first', foundGame._id);
        await user_updatescores(selectedWinners.second.trim(), 'second', foundGame._id);
        await user_updatescores(selectedWinners.third.trim(), 'third', foundGame._id);
    } catch (error) {
        console.error('Error submitting round:', error);
    }

    try {
        const Game = await Games.findById(game);
        if (!Game) {
            console.log("Game not found");
            return res.status(404).json({ message: 'Game not found' });
        }
    
        // Get teams from the Game
        const teams = Game.teams;
    
        // Calculate total points for each team
        const teamScores = teams.map(team => ({
            corporatecode: team.corporatecode,
            score: team.score || 0
        }));
    
        // Sort teams based on their score in descending order
        teamScores.sort((a, b) => b.score - a.score);
    
        // Determine final positions based on scores
        const finalPositions = {
            first: teamScores[0]?.corporatecode || null,
            second: teamScores[1]?.corporatecode || null,
            third: teamScores[2]?.corporatecode || null
        };
        console.log(finalPositions);
    
        // Update the Game document with the final positions
        Game.pos1 = finalPositions.first;
        Game.pos2 = finalPositions.second;
        Game.pos3 = finalPositions.third;
        // Game.status='over';
        // Create individual certificates for each position
        const certificates = [
            { name: finalPositions.first, position: 1, event: Game.eventname },
            { name: finalPositions.second, position: 2, event: Game.eventname },
            { name: finalPositions.third, position: 3, event: Game.eventname }
        ];
    
        // Award each certificate to the corresponding team member only
        if (finalPositions.first) {
            await Usermodel.updateMany(
                { corporatecode: finalPositions.first },
                { $push: { certificates: certificates[0] } }
            );
        }
    
        if (finalPositions.second) {
            await Usermodel.updateMany(
                { corporatecode: finalPositions.second },
                { $push: { certificates: certificates[1] } }
            );
        }
    
        if (finalPositions.third) {
            await Usermodel.updateMany(
                { corporatecode: finalPositions.third },
                { $push: { certificates: certificates[2] } }
            );
        }
    
        // Save the updated Game document
        await Game.save();
    
        res.status(200).json({ message: 'Final Game submitted successfully', certificates });
    } 
     catch (error) {
        console.error('Error submitting final Game:', error);
        res.status(500).json({ message: 'Failed to submit final Game', error: error.message });
    }
});


module.exports = router;
