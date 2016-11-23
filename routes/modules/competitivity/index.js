var express = require('express');
var passport = require('passport');
var auth = require('../../../middleware/auth')
var router = express.Router();

// ==== MAIN ====

router.get('/', auth.isLoggedIn, function(req, res) {
    res.render('modules/competitivity/index',{
      user:req.user
    });
});

module.exports = router;
