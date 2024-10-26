const express = require('express');
const Adminmodel = require('../../models/AdminSchema')
const router = express.Router();
const Teammodel = require('../../models/Teammodel');
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
    console.log(req.body);

    // Ensure the naming matches the schema
    const { TeamCode, teamNickname, password } = req.body; // Capitalized variable names
    const profilePicPath = req.file ? req.file.path : null; // Full path to the uploaded profile picture

    const newTeam = new Teammodel({
        TeamCode: TeamCode,
        teamNickname: teamNickname,
        password: password,
        imgurl: profilePicPath
    });

    // Save the new team and send a response
    newTeam.save()
        .then(() => res.status(200).json({ message: 'Team added successfully' }))
        .catch(error => {
            console.error('Error saving team:', error); // Log error for debugging
            res.status(500).json({ error: 'Failed to add team' });
        });
});
module.exports =router
