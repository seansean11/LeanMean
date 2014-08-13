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
var port = process.env.PORT || 8080;

// --------------------------------------------------
// Middlesware
// --------------------------------------------------
mongoose.connect(database.url);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static( __dirname + '/dist/'));
app.all('/', function(req, res) {
	res.sendfile('./index.html', { root: 'dist' });
});

// --------------------------------------------------
// Routes
// --------------------------------------------------
var User = require('./server/controllers/user');
var ToDo = require('./server/controllers/todo');
var router = express.Router();

router.route('/users')
	.get(User.getAll)
	.post(User.post);

router.route('/users/:user_id')
	.get(User.getOne)
	.put(User.put)
	.delete(User.delete);

router.route('/todos')
	.get(ToDo.getAll)
	.post(ToDo.post);

router.route('/todos/:todo_id')
	.put(ToDo.put)
	.delete(ToDo.delete);

// Route RESTful API
app.use('/api', router);

// --------------------------------------------------
// Start the show
// --------------------------------------------------
app.listen(port, function() {
	console.log('listening on port ' + port );
});