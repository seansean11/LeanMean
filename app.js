'use strict';

// --------------------------------------------------
// Packages
// --------------------------------------------------
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var database = require('./server/database');
var bodyParser = require('body-parser');
var request = require('request');
var port = process.env.PORT || 8080;

// --------------------------------------------------
// Middleware
// --------------------------------------------------
mongoose.connect(database.url);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/dist/'));

// --------------------------------------------------
// Routes
// --------------------------------------------------
var router = require('./server/routes/routes');

// Route RESTful API
app.use('/api', router);

// --------------------------------------------------
// Start the show
// --------------------------------------------------

// Catchall
app.all('/*', function(req, res) {
	res.sendFile('./index.html', { root: 'dist' });
});

app.listen(port, function() {
	console.log('listening on port ' + port );
});