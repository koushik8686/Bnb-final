const router = require('express').Router();
const Judge = require('../../models/JudgeSchema');
const Games = require('../../models/Gammeschema');

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
    try {
        const judge = await Judge.findOne({ _id: req.params.id }); // Use _id for MongoDB documents
        if (!judge) {
            return res.status(404).json({ message: 'Judge not found' });
        }
        // Query games where the judges array contains an object with the matching id
        const games = await Games.find({ 'judges.id': judge._id.toString() }); 

        res.json(games);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving games', error: error.message }); // Include error message
    }
});

module.exports = router;
