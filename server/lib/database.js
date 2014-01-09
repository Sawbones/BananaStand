var Sequelize = require('sequelize');
var seq = new Sequelize('game', 'root', '', {
	dialect : 'mysql',
	port : 3306
});

seq.authenticate().complete(auth_callback)

function auth_callback(err)
{
	if(err)
	{
		console.log('Unable to connect');
	}
	else
	{
		console.log('Connected to mysql db');
	}
}

var User = seq.define('user', {
	username : Sequelize.STRING,
	password : Sequelize.STRING,
	x : Sequelize.INTEGER,
	y : Sequelize.INTEGER,
	world : Sequelize.STRING,
	race : Sequelize.STRING
});

var World = seq.define('world', {
	name : Sequelize.STRING,
	max : Sequelize.INTEGER
});

module.exports.User = User;