var orm = require('orm');
var db = orm.connect("mysql://root@localhost/game");

db.on('connect', function(err){
	if(err) {
		throw err;
	}
});

var User = db.define('user', {
	username : String,
	password : String,
	world : String,
	x : Number,
	y : Number,
	sprite : String,
	animation : String
});

module.exports.db = db;
module.exports.User = User;