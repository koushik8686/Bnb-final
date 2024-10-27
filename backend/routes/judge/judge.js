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
            arr.forEach(game => {
            game.judges.forEach(jud => {
                    console.log(String(jud._id) ,String(judge._id));
                    if(String(jud._id) === String(judge._id)){
                        games.push(game)
                    }
                });
            });
        });
        
        console.log(games);
    res.send(games);

});

router.get('/getgamecompanydetails/:id' , function(req, res) {
    Games.findById(req.params.id)
   .then(game => {
    res.send(game);
   })
})

router.post("/submitround", async (req, res) => {
    const { game, selectedWinners } = req.body;
    try {
        // Find the game by its ID
        const foundGame = await Games.findById(game);
        if (!foundGame) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Update scores for the winning teams
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
                // Update the game in the database with the modified teams array
                const updateResult = await Games.updateOne({ _id: foundGame._id }, { $set: { teams: updatedTeams } });
            } else {
                console.error(`Team with code ${teamCode} not found in game.`);
            }
        };
        
        const user_updatescores = async (teamCode, place, gameId) => {
            const scoreIncrement = place === 'first' ? 5 : place === 'second' ? 3 : 1;
            console.log(scoreIncrement ,gameId);
            // Find the team by code
            const team = await Teammodel.findOne({ TeamCode: teamCode });
            if (team) {
                // Find the game by ID to get calories
                team.points+=place
                const game = await Games.findOne({ _id: gameId });
                if (!game) {
                    console.error(`Game with ID ${gameId} not found.`);
                    return;
                }
        
                const caloriesBurnt = game.calories; // Total calories from the game
        
                // Iterate through each member of the team
                for (const member of team.members) {
                    // Find the user by their unique code
                    const user = await Usermodel.findOne({ uniquecode: member.uniquecode });
                    if (user) {
                        // Calculate calories burned based on user age
                        const userAge = user.age;
                        const caloriesForUser = caloriesBurnt / (userAge || 1); // Avoid division by zero
        
                        // Check if the user already has points for this game
                        const existingPointEntry = user.points.find(p => p.game === gameId);
                        if (existingPointEntry) {
                            // If entry exists, update points and calories
                            existingPointEntry.points += scoreIncrement;
                            existingPointEntry.calories += caloriesForUser; // Update calories
                        } else {
                            // If not, push a new point entry
                            user.points.push({
                                game: gameId,
                                points: scoreIncrement,
                                calories: caloriesForUser // Store calculated calories
                            });
                        }
                        // Save the updated user document
                        await user.save();
                        console.log(`Scores updated for user ${user.email} in team ${teamCode}.`);
                    } else {
                        console.error(`User with unique code ${member.uniquecode} not found.`);
                    }
                }
            } else {
                console.error(` user Team with code ${teamCode} not found in game.`);
            }
        };      
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
    const { gameId, positions } = req.body; // positions: { first: '', second: '', third: '' }

    try {
        const game = await Games.findById(gameId);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Get teams from the game
        const teams = game.teams; // Assuming teams is an array in the game document

        // Calculate total points for each team
        const teamScores = teams.map(team => ({
            corporatecode: team.corporatecode,
            score: team.score || 0 // Fallback to 0 if score doesn't exist
        }));

        // Sort teams based on their score in descending order
        teamScores.sort((a, b) => b.score - a.score);

        // Determine final positions based on scores
        const finalPositions = {
            first: teamScores[0]?.corporatecode || null,
            second: teamScores[1]?.corporatecode || null,
            third: teamScores[2]?.corporatecode || null
        };

        // Prepare data for the API call to submitround
        const roundData = {
            game: gameId,
            selectedWinners: finalPositions // sending the calculated positions
        };

        // Make a POST request to submitround
        const response = await axios.post('http://localhost:4000/submitround', roundData);
        
        // Process the response from submitround if necessary
        if (response.status === 200) {
            const { data } = response;
            console.log('Round submitted successfully:', data);
        } else {
            return res.status(response.status).json({ message: 'Failed to submit round', error: response.data });
        }

        // Update the game with the final positions
        game.pos1 = finalPositions.first;
        game.pos2 = finalPositions.second;
        game.pos3 = finalPositions.third;

        // Generate certificates for the winning teams
        const certificates = [
            { name: finalPositions.first, position: 1, event: game.eventname },
            { name: finalPositions.second, position: 2, event: game.eventname },
            { name: finalPositions.third, position: 3, event: game.eventname }
        ];

        game.certificates.push(...certificates);

        // Update the user certificates
        await Usermodel.updateMany(
            { 'points.game': gameId },
            {
                $push: {
                    certificates: {
                        $each: certificates
                    }
                }
            }
        );

        await game.save();
        res.status(200).json({ message: 'Final game submitted successfully', certificates });
    } catch (error) {
        console.error('Error submitting final game:', error);
        res.status(500).json({ message: 'Failed to submit final game', error: error.message });
    }
});

module.exports = router;
