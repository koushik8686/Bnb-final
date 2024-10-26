const express = require('express');
const companymodel = require('../../models/Teammodel');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { teamCode, password } = req.body; 
    try {
      // Find admin by email
      const admin = await companymodel.findOne({ TeamCode:teamCode });
      if (!admin) return res.status(400).json({ error: 'companymodel not found' });
     console.log( admin.password , password);
      // Directly compare passwords without encryption
      if (password !== admin.password) {
        return res.status(400).json({ error: 'Invalid password' });
      }
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Failed to log in' });
    }
  });

module.exports =router