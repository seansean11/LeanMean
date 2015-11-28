var mongoose = require('mongoose');

var TodoSchema = mongoose.Schema({
	user_id: {type:Number, required:true},
	todo: {type:String, required:true},
	at: {type:Date, default:new Date()}
});

module.exports = mongoose.model('ToDo', TodoSchema);