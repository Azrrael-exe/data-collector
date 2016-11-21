var express = require('express');
var passport = require('passport');
var auth = require('../middleware/auth')
var router = express.Router();

// ==== MAIN ====

router.get('/', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
});

router.get('/contact', function(req, res) {
    res.redirect('/contact.html'); // load the index.ejs file
});

router.get('/about', function(req, res) {
    res.redirect('/about.html'); // load the index.ejs file
});

// === Login ====

router.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/dashboard', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }
));

// ==== Singup ====
router.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/dashboard', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  })
);

// === Dashboard ===

router.get('/dashboard', auth.isLoggedIn, function(req, res) {
  res.render('dashboard.ejs', {
    user : req.user,
    message: req.flash('loginMessage')
  });
});

// ==== PROFILE SECTION ====
router.get('/profile', auth.isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
    });
});

// ==== LOGOUT ====
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
