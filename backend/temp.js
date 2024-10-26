// Import the Admin model
const TeamModel = require('./models/Teammodel'); // Replace with the correct path
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

// Connect to MongoDB
mongoose.connect("mongodb+srv://koushik:koushik@cluster0.h2lzgvs.mongodb.net/bnbfinals" , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Function to add an admin
const companies = [
  {
    TeamCode: 'AMZN',
    teamNickname: 'Amazon.com, Inc.',
    password: 'amazon123',
    imgurl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    members: [
        { id: '7', uniquecode: 'AMZ001' },
        { id: '8', uniquecode: 'AMZ002' },
    ],
},
{
    TeamCode: 'TSLA',
    teamNickname: 'Tesla, Inc.',
    password: 'tesla123',
    imgurl: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg',
    members: [
        { id: '9', uniquecode: 'TSL001' },
        { id: '10', uniquecode: 'TSL002' },
    ],
},
{
    TeamCode: 'META',
    teamNickname: 'Meta Platforms, Inc.',
    password: 'meta123',
    imgurl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Meta_Inc._logo_2021.svg',
    members: [
        { id: '11', uniquecode: 'MTA001' },
        { id: '12', uniquecode: 'MTA002' },
    ],
},
{
    TeamCode: 'NFLX',
    teamNickname: 'Netflix, Inc.',
    password: 'netflix123',
    imgurl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    members: [
        { id: '13', uniquecode: 'NFL001' },
        { id: '14', uniquecode: 'NFL002' },
    ],
},
{
    TeamCode: 'NVDA',
    teamNickname: 'NVIDIA Corporation',
    password: 'nvidia123',
    imgurl: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg',
    members: [
        { id: '15', uniquecode: 'NVD001' },
        { id: '16', uniquecode: 'NVD002' },
    ],
},
{
    TeamCode: 'IBM',
    teamNickname: 'International Business Machines Corporation',
    password: 'ibm123',
    imgurl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    members: [
        { id: '17', uniquecode: 'IBM001' },
        { id: '18', uniquecode: 'IBM002' },
    ],
},
{
    TeamCode: 'ORCL',
    teamNickname: 'Oracle Corporation',
    password: 'oracle123',
    imgurl: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
    members: [
        { id: '19', uniquecode: 'ORC001' },
        { id: '20', uniquecode: 'ORC002' },
    ],
},
  // Add more companies if needed
];

// Function to add companies to the database
async function addCompanies() {
  try {

      await TeamModel.insertMany(companies);
      console.log('Companies added successfully');
  } catch (error) {
      console.error('Error adding companies:', error);
  } finally {
      mongoose.connection.close();
  }
}

// Call the function
addCompanies();

// Run the function to add an admin
