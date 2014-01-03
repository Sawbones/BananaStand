var db 	= require('./database.js');
var m 	= require('./message.js');
var _ 	= require('underscore');
var logged_in_users = {};

function ServerHandler(socket)
{
	this.login = function(user_data)
	{
		var username = user_data.username;
		var password = user_data.password;

		var find = {
			username : username,
			password : password
		};
		db.User.find(find, user_check);

		function user_check(err, user)
		{
			if(user.length > 0)
			{
				logged_in_users[user[0].id] = user[0];

				socket.emit('login', m(true, user[0]) );
			}
			else
			{
				socket.emit('login', m(false, 'User not recongnized'));
			}
		}
	}

	this.update = function(user_data)
	{
		var user = logged_in_users[user_data.id];

		if(typeof user != 'undefined')
		{
			user.x = user_data.x;
			user.y = user_data.y;
			user.animation = user_data.animation;

			logged_in_users[user_data.id] = user;
		}
	}

	setInterval(function(){
		socket.emit('update', logged_in_users);
	}, 16);

	socket.on('login', this.login);
	socket.on('update', this.update);
}

module.exports = ServerHandler;