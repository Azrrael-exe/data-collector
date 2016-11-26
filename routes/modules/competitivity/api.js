var express = require('express');
var User = require('../../../models/user');
var Town = require('../../../models/modules/competitivity/town');
var jwt = require('jsonwebtoken');
var router = express.Router();
var auth = require('../../../middleware/auth');

var parameters = require('./info.js');

router.post('/users', auth.verifyToken, function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

router.get('/towns', function(req, res) {
  Town.find({}, function(err, towns) {
    res.json(towns);
  });
});

router.post('/add', function(req, res){
  Object.keys(req.body).forEach(function(key){
    console.log(key, req.body[key]);
  });

  if(req.body.town){
    res.json({
        message:"Todo bien, todo bonito",
        status:"ok"
    })}
  else{
    town = new Town({
      name : req.body.name,
      code : req.body.code,
    })
    Object.keys(req.body).forEach(function(key){
      data = {};
      data[key] = req.body[key];
      town.data.push(data);
    });
    town.save(function(err){
      if(err) {
        res.json({
          message:err.message,
          status:'error'
        })}
      else{
        res.json({
          message:'Town Created',
          status: 'ok'
      })}
  })}
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

router.post('/parameters',  function(req, res){
  res.send(parameters)
});

module.exports = router;
