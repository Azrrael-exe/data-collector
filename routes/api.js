var express = require('express');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var router = express.Router();
var auth = require('../middleware/auth')

router.post('/users', auth.verifyToken, function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

router.post('/auth', function(req, res){
  User.findOne({ "local.email" : req.body.email},
     function(err, user) {
       if (err) throw err;
       if (!user) {
         res.json({ success: false, message: 'Authentication failed. User not found.' });
       }
       else if (user) {
         if (!user.validPassword(req.body.password)) {
           res.json({ success: false, message: 'Authentication failed. Wrong password.' });
         }
         else {
           var token = jwt.sign(user, 'superSecret', {
             algorithm: "HS256",
             expiresIn: '1440m'                     // expires in 24 hours
           });
           res.json({
             success: true,
             message: 'Enjoy your token!',
             token: token
           });
         }
       }
  });
});

module.exports = router;
