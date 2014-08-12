var mongoose = require('mongoose');
var User = require('../models/user');

var UserMethods = {
	getAll : function(req,res) {
		User.find(function(err, users) {
			if(err)
				res.send(err);
			res.json(users);
		});
	},
	post : function(req,res) {
		var user = new User();
		user.name.first = req.body.name.first;
		user.name.last = req.body.name.last;
		user.username = req.body.username;
		user.email = req.body.email;
		user.password = req.body.password;
		
		user.save(function(err) {
			if(err)
				res.send(err);
			res.json({ message: 'Added new user!', data: user });
		});
	},
	getOne : function(req,res){
		User.findById(req.params.user_id, function(err, user) {
			if(err)
				res.send(err);
			res.json(user);
		});
	},
	put : function(req,res) {
		User.findById(req.params.user_id, function(err, user) {
			if(err)
				res.send(err);
			user.name.first = req.body.name.first;
			user.name.last = req.body.name.last;
			user.username = req.body.username;
			user.email = req.body.email;
			user.password = req.body.password;

			user.save(function(err) {
				if(err)
					res.send(err);
				res.json(user);
			});
		});
	},
	delete : function(req,res) {
		User.findByIdAndRemove(req.params.user_id, function(err) {
			if(err)
				res.send(err);
			res.json({ message: 'User deleted!' });
		});
	}
};

module.exports = UserMethods;