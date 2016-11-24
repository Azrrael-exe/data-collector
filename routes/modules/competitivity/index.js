var express = require('express');
var passport = require('passport');
var auth = require('../../../middleware/auth')
var router = express.Router();

var parameters = require('./info.js');

// ==== MAIN ====

router.get('/', auth.isLoggedIn, function(req, res) {
    res.render('modules/competitivity/index',{
      user:req.user,
      parameters: parameters
    });
});

router.get('/input', auth.isLoggedIn, function(req, res) {
    res.render('modules/competitivity/input',{
      user:req.user,
      parameters: parameters
    });
});

router.get('/results', auth.isLoggedIn, function(req, res) {
    res.render('modules/competitivity/results',{
      user:req.user,
      parameters: parameters
    });
});

module.exports = router;
