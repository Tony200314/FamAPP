
const express = require('express');
const User = require('../models/userModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();


// Register a new user
router.post('/register', async (req, res) => {
     const {name, email, password} = req.body;
     try{
         const newUser = new User({ name, email, password });
         await newUser.save();
         res.status(201).json({message: 'User registered successfully' });
     } catch (error) {
         res.status(400).json({ error: 'User already exists' });
     }
});


//Login user and generate JWT token
router.post('/login', async (req, res) => {
     const { email, password } = req.body;
     try{
         const user = await User.findOne({ email });
         if (!User) return res.status(404).json({ error: 'User not found'});

         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h'});
         res.json({ token });
     } catch (error) {
         res.status(500).json({ error: 'Server error' });
     }
});

module.exports = router;