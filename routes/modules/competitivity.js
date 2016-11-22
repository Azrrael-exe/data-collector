var express = require('express');
var passport = require('passport');
var auth = require('../../middleware/auth')
var router = express.Router();

// ==== MAIN ====

router.get('/', function(req, res) {
    res.render('index.ejs');
});

module.exports = router;
