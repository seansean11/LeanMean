'use strict';

var express = require('express');
var User = require('../controllers/user');
var ToDo = require('../controllers/todo');
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

module.exports = router;