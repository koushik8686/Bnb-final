const express = require('express');
const Usermodel = require('../../models/userschema');
const Team = require('../../models/Teammodel'); // Import the Team model
const game = require('../../models/Gammeschema');
const router = express.Router();

// Register Route with Enhanced Error Handling
router.post('/register', async (req, res) => {
    const { corporatecode, email, password, age, uniquecode } = req.body;

    try {
        console.log("Received registration request:", req.body);

        // Check if the corporate code exists in the Team model
        const team = await Team.findOne({ TeamCode: corporatecode });

        if (!team) {
            console.log('Corporate code not found');
            return res.status(400).json({ message: 'Invalid corporate code' });
        }

        // Create a new user with the provided details
        const newUser = new Usermodel({
            corporatecode,
            email,
            password,
            age,
            uniquecode,
            points: [] 
        });

        // Save the new user to the User collection
        const savedUser = await newUser.save();

        // Add the user's unique code to the members array in the Team model
        team.members.push({ id: savedUser._id.toString(), uniquecode });
        await team.save();

        console.log('Registration successful for user:', savedUser._id);
        res.json({ message: 'Registration successful', userId: savedUser._id });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { uniquecode, password } = req.body;

    try {
        console.log("Attempting login...");
        // Find the user by uniquecode
        const user = await Usermodel.findOne({ uniquecode });

        // Check if the user exists and the password matches
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid login credentials' });
        }

        // Send a success response with user ID if needed
        res.json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




router.get('/getuserdetails/:id', async (req, res) => {
    console.log("Inside get user details");
    const userId = req.params.id; // Get user ID from the request parameters

    try {
        const user = await Usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user details except password
        const { password, ...userDetails } = user._doc;
        res.json(userDetails);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/getusergames/:id', async (req, res) => {
    const userId = req.params.id; // Get user ID from the request parameters

    try {
        console.log("Inside get user game details");

        const user = await Usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find games where the user's ID is present in the players array
        const games = await game.find({
            'teams.players.id': userId,
        });
        console.log("Inside get user game details deep");
        res.json(games); // Return the games that the user plays
    } catch (error) {
        console.error('Error fetching user games:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
