var db 	= require('./database.js');
var m 	= require('./message.js');
var _ 	= require('underscore');

function ServerHandler(socket)
{
	this.login = function(user_data)
	{
		var username = user_data.username;
		var password = user_data.password;

		var where = {
			username : user_data.username,
			password : user_data.password
		};

		db.User.find(where)
		.complete(function(err, user){
			console.log(user.values);

			player_entities[user.username] = user.values;
		});
	}

	socket.on('login', this.login);
	//socket.on('update', this.update);
}

module.exports = ServerHandler;