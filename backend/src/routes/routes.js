const express = require('express'); 
const app = express(); 
const PORT = 3000; 

app.get("/", (req, res) => {
    res.send("Welcome to the Home Page");
}); 

app.get("/login", (req, res) =>{
    res.sendFile(__dirname + "/frontend/pages/Loginform.html");
    console.log("Login page requested");
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}));

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/frontend/pages/Registerform.html");
    console.log("Register page requested");
}); 

app.post("/register", (req, res) => {
    const { username, password } = req.body;
    console.log(`Registration attempt with username: ${username} and password: ${password}`);
    
    // Here you would typically save the user to a database
    res.send("Registration successful!");
}); 

