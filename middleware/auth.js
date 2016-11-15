var jwt = require('jsonwebtoken');

module.exports = {
  isLoggedIn : function (req, res, next) {
      // if user is authenticated in the session, carry on
      if (req.isAuthenticated())
          return next();
      // if they aren't redirect them to the home page
      res.redirect('/');
    },
  verifyToken : function (req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, 'superSecret', function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        }
        else
        {
          var decoded = jwt.decode(token, 'superSecret');
          req.decoded = decoded;
          req.user = decoded._doc.local.email
          next();
        }
      });
    }
    else{
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
  }}
};
