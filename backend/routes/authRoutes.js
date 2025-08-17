const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new Jeevan ID
router.post('/register', async (req, res) => {
  try {
    const { name, age, address, bloodGroup, allergies, medicalConditions, emergencyContact, personContact, photo } = req.body;

    const existingUser = await User.findOne({ personContact });
    if (existingUser)
      return res.status(400).send({ message: "JeevanID already exists with this phone number!" });

    const user = new User({
      name,
      age,
      address,
      bloodGroup,
      allergies,
      medicalConditions,
      emergencyContact,
      personContact,
      photo
    });

    await user.save();
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch JeevanID by phone number
router.get('/jeevanid/:phone', async (req, res) => {
  try {
    const { phone } = req.params;
    const idCard = await User.findOne({ personContact: phone });

    if (!idCard)
      return res.status(400).send({ message: "This phone number is not registered for JeevanID." });

    res.status(200).send({ user: idCard });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
