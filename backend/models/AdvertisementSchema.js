// backend/models/Advertisement.js
const mongoose = require('mongoose');

const AdvertisementSchema = new mongoose.Schema({
  adverCompanyId: {
    type: String,
    required: true,
  },
  adverCompanyName: {
    type: String,
    required: true,
  },
  adverCompanyLogoUrl: {
    type: String,
    required: true,
  },
  companyLink: {
    type: String,
    required: true,
  },
  noOfClicks: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number, // Integer type
    default: 1, // Default weight set to 1
    required: false, // Not required
  },
});

module.exports = mongoose.model('Advertisement', AdvertisementSchema);
