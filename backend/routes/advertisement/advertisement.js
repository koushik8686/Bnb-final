const express = require('express');
const router = express.Router();
const Advertisement = require('../../models/AdvertisementSchema');

// Route to get all advertisements
let currentIndex = -1;
let currentWeight = 0;
let maxWeight = 0;
let gcdWeight = 1;

router.get('/all', async (req, res) => {
  try {
    const ads = await Advertisement.find();

    if (ads.length > 0) {
      // Calculate maxWeight and gcdWeight once based on the weights of ads
      if (maxWeight === 0 || gcdWeight === 1) {
        maxWeight = Math.max(...ads.map(ad => ad.weight));
        gcdWeight = ads.reduce((acc, ad) => gcd(acc, ad.weight), ads[0].weight);
      }

      // Weighted Round Robin Logic
      while (true) {
        currentIndex = (currentIndex + 1) % ads.length;

        if (currentIndex === 0) {
          currentWeight -= gcdWeight;
          if (currentWeight <= 0) {
            currentWeight = maxWeight;
          }
        }

        if (ads[currentIndex].weight >= currentWeight) {
          return res.status(200).json(ads[currentIndex]);
        }
      }
    } else {
      res.status(404).json({ message: 'No advertisements found' });
    }
  } catch (error) {
    console.error('Error fetching advertisement:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Utility function to find gcd of two numbers
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}


// Route to update click count based on adverCompanyId
router.post('/Clickup/:adverCompanyId', async (req, res) => {
  const { adverCompanyId } = req.params;

  try {
    const ad = await Advertisement.findOne({ adverCompanyId });
    if (!ad) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    ad.noOfClicks += 1;
    await ad.save();

    res.status(200).json({ message: 'Click count updated', clicks: ad.noOfClicks });
  } catch (error) {
    console.error('Error updating click count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all metrics (all advertisements data)
router.get('/getmetrics', async (req, res) => {
  try {
    const ads = await Advertisement.find(); // Fetch all advertisements

    if (ads.length > 0) {
      res.status(200).json(ads); // Send all advertisement data to the frontend
    } else {
      res.status(404).json({ message: 'No advertisements found' });
    }
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Route to add a new advertisement
router.post('/add', async (req, res) => {
  const { adverCompanyId, adverCompanyName, adverCompanyLogoUrl, companyLink } = req.body;

  try {
    const newAd = new Advertisement({
      adverCompanyId,
      adverCompanyName,
      adverCompanyLogoUrl,
      companyLink,
      noOfClicks: 0,
    });

    await newAd.save();
    res.status(201).json({ message: 'Advertisement added successfully', ad: newAd });
  } catch (error) {
    console.error('Error adding advertisement:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete an advertisement based on adverCompanyId
router.delete('/delete/:adverCompanyId', async (req, res) => {
  const { adverCompanyId } = req.params;

  try {
    const deletedAd = await Advertisement.findOneAndDelete({ adverCompanyId });
    if (!deletedAd) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    res.status(200).json({ message: 'Advertisement deleted successfully' });
  } catch (error) {
    console.error('Error deleting advertisement:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
