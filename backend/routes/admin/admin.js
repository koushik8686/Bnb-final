const express = require('express');
const Adminmodel = require('../../models/AdminSchema')
const router = express.Router();

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
  
      res.status(200).json({ message: 'Login successful', userId: admin._id, startup: admin.startup });
    } catch (error) {
      res.status(500).json({ error: 'Failed to log in' });
    }
  });

module.exports =router