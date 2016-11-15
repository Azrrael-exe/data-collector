var express = require('express');
var passport = require('passport');
var auth = require('../middleware/auth')
var router = express.Router();
var Survey = require('../models/survey')

router.get('/create', auth.isLoggedIn, function(req, res){
  var survey = new Survey({
    author : req.user
  })
  survey.save(function(err){
    if(!err){
        res.json({
          message:'Survey Created',
          survey: survey,
          status: 'ok'
      })
    }
  })
})

module.exports = router;
