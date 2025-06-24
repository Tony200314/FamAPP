const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const path = require("path");
const User = require("./src/models/userModels");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/familyAppDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend")));

app.use(session({
    secret: "Tony Diamond",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "pages", "FirstPageofFamApp.html"));
});

// Registration Page
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "pages", "Registration.html"));
});

// Register a New User
app.post("/register", (req, res) => {
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secret");
            });
        }
    );
});

// Login Page
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "pages", "Loginform.html"));
});

// Login Handler
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}));

// Secret Page (Protected)
app.get("/secret", isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "pages", "SecretPage.html")); // customize as needed
});

// Logout
app.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) return next(err);
        res.redirect("/");
    });
});

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server has started on port", port);
});
