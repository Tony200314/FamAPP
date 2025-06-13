const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Message = require('../models/Message');
const authRoutes = require('../routes/auth');
const auth = require('../middleware/auth');



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Protected route (only accessible with a valid token)
app.get('/api/private', auth, (req, res) => {
     res.send('This is a protected route');
   });

   app.get('/', (req, res) => {
     res.send('Hello World!');
});

app.post('/api/message', async (req, res) => {
     const newMessage = new Message({ text: req.body.text });
     try{
         await newMessage.save();
         res.status(201).json(newMessage);
     } catch (error) {
         res.status(500).json({ error: 'Error saving message' });
     }
})

mongoose
     .connect('mongodb://localhost:27017/')
     .then(() => console.log('MongoDB Connected'))
     .catch((err) => console.log('MongoDB connection error:', err));

app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
});