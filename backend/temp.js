// Import the Admin model
const Admin = require('./models/AdminSchema'); // Replace with the correct path
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

// Connect to MongoDB
mongoose.connect("mongodb+srv://koushik:koushik@cluster0.h2lzgvs.mongodb.net/bnbfinals" , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Function to add an admin
async function addAdmin() {
  try {
    const newAdmin = new Admin({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "securepassword123",
    });

    const savedAdmin = await newAdmin.save();
    console.log('Admin added successfully:', savedAdmin);
  } catch (error) {
    console.error('Error adding admin:', error);
  }
}

// Run the function to add an admin
addAdmin();
