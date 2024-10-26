const express = require('express');
const Adminmodel = require('../../models/AdminSchema')
const router = express.Router();
const Teammodel = require('../../models/Teammodel');
const Gamemodel = require('../../models/Gammeschema');
const Judgemodel = require('../../models/JudgeSchema');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/profiles/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique file names
  }
});

const upload = multer({ storage });


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find admin by email
      const admin = await Adminmodel.findOne({ email });
      if (!admin) return res.status(400).json({ error: 'Adminmodel not found' });
     console.log(admin.email , admin.password , password);
      // Directly compare passwords without encryption
      if (password !== admin.password) {
        return res.status(400).json({ error: 'Invalid password' });
      }
  
      res.status(200).json({ message: 'Create team successful' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to log in' });
    }
  });

  router.post('/addteam', upload.single('image'), function(req, res) {
    console.log('Request body:', req.body); // Check request payload
    console.log('Uploaded file:', req.file); // Check uploaded file details

    const { TeamCode, teamNickname, password } = req.body;
    const profilePicPath = req.file ? req.file.path : null;

    // Confirm values before saving
    console.log('TeamCode:', TeamCode, 'teamNickname:', teamNickname, 'password:', password, 'imgurl:', profilePicPath);

    const newTeam = new Teammodel({
        TeamCode: TeamCode,
        teamNickname: teamNickname,
        password: password,
        imgurl: profilePicPath
    });

    // Save to database
    newTeam.save()
        .then(() => res.status(200).json({ message: 'Team added successfully' }))
        .catch(error => {
            console.error('Error saving team:', error);
            res.status(500).json({ error: 'Failed to add team' });
        });
});

  router.post('/addgame', async function(req, res) {
    console.log(req.body);
    console.log(req.body.game.judges);
    const { eventName, singleplayer, multiplayer, date, num_of_players, start_time, end_time, judges } = req.body.game;

    const newGame = new Game({
        eventName,
        singleplayer,
        multiplayer,
        date,
        num_of_players,
        start_time,
        end_time,
        judges,
    });

    try {
        await newGame.save();
        for (let i = 0; i < judges.length; i++) {
          const judge = await Judgemodel.findByIdAndUpdate(judges[i].id, { $push: { games: newGame._id } }, { new: true });
          judge.save();  
        }
        res.status(200).json({ message: 'Game added successfully!' });
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ error: 'Failed to add game' });
    }
});

module.exports =router
