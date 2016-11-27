var express = require('express');
var passport = require('passport');
var auth = require('../../../middleware/auth')
var router = express.Router();

var parameters = require('./info.js');

// ==== MAIN ====

router.get('/', auth.isLoggedIn, function(req, res) {
    res.render('modules/competitivity/index',{
      user : req.user,
      tab : "description"
    });
});

router.get('/create', auth.isLoggedIn, function(req, res) {
    res.render('modules/competitivity/index',{
      user:req.user,
      parameters: parameters,
      tab : 'create'
    });
});

router.get('/edit', auth.isLoggedIn, function(req, res) {
    res.render('modules/competitivity/index',{
      user:req.user,
      parameters: parameters,
      tab : 'edit'
    });
});

router.get('/results', auth.isLoggedIn, function(req, res) {
    res.render('modules/competitivity/index',{
      user:req.user,
      parameters: parameters,
      tab : 'results'
    });
});

module.exports = router;
