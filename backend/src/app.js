const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose') 
const dotenv = require('dotenv'); 
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');

const app = express(); 



// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes); 

app.get('/', (req,res)=>{
    res.send('API is running');
});


module.exports = app;