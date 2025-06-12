const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // oder Plan.js
const auth = require('../middleware/auth');

// GET alle Messages eines Users
router.get('/', auth, async (req, res) => {
  const messages = await Message.find({ userId: req.user.id });
  res.json(messages);
});

// POST neue Message
router.post('/', auth, async (req, res) => {
  const newMsg = new Message({
    text: req.body.text,
    userId: req.user.id,
  });
  await newMsg.save();
  res.status(201).json(newMsg);
});

module.exports = router;
