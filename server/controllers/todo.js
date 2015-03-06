var mongoose = require('mongoose');
var ToDo = require('../models/todo');

var ToDoMethods = {
	getAll : function(req,res) {
		ToDo.find(function(err, todos) {
			if(err)
				res.send(err);
			res.json(todos);
		});
	},
	post : function(req,res) {
		var todo = new ToDo();
		todo.user_id = req.body.user_id;
		todo.todo = req.body.todo;

		todo.save(function(err) {
			if(err)
				res.send(err);
	
			res.json(todo);
		});
	},
	put : function(req,res) {
		ToDo.findById(req.params.todo_id, function(err, todo) {
			if(err)
				res.send(err);
			todo.todo = req.body.todo;

			todo.save(function(err) {
				if(err)
					res.send(err);
				
				res.json(todo);
			});
		});
	},
	delete : function(req,res) {
		ToDo.findByIdAndRemove(req.params.todo_id, function(err) {
			if(err)
				res.send(err);
			res.json({ message: 'Todo deleted!' });
		});
	}
};

module.exports = ToDoMethods;