var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var survey = require('./routes/survey')

var mongoose = require('mongoose');
var dbconfig = require('./config/db.js')

mongoose.connect(dbconfig.url);

var app = express();

// === Config passport required for passport ====
app.use(session({ secret: "Ovewatch",
    saveUninitialized: true,
    resave: true}));                  // session secret
app.use(passport.initialize());
app.use(passport.session());                                // persistent login sessions
app.use(flash());

require('./config/passport.js')(passport);                // pass passport for configuration


// view engine setup
app.set('view engine', 'ejs');                              // set up ejs for templating

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api', api);
app.use('/survey', survey)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
