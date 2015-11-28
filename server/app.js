'use strict';

// --------------------------------------------------
// Packages
// --------------------------------------------------
var db = require('./config/database');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var request = require('request');
var port = process.env.PORT || 8080;
var env = process.env.NODE_ENV || 'dev';

// --------------------------------------------------
// Middleware
// --------------------------------------------------
(env === 'dev') ? mongoose.connect(db.dev) : mongoose.connect(db.prod);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
  secret: 'leanMEAN',
  resave: false,
  saveUninitialized: false
}));

// --------------------------------------------------
// Routes
// --------------------------------------------------
var router = require('./routes/routes');
app.use('/api', router);

// --------------------------------------------------
// Start the show
// --------------------------------------------------
app.use(express.static('./client/'));
app.use(express.static('./'));
app.use('/*', express.static('./client/index.html'));

app.listen(port, function() {
	console.log('listening on port ' + port );
});