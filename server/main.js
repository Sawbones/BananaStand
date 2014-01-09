var io 				= require('socket.io').listen(8080);
var ServerHandler 	= require('./lib/server_handler.js');
var db 				= require('./lib/database.js');

var time 			= new Date().getTime();
var oldTime 		= time;
var delta 			= 16;

io.set('log level', 1);
io.sockets.on('connection', ServerHandler);

users = [];

function ServerGame()
{

}

ServerGame.prototype.update = function(delta)
{

}

var game = new ServerGame();

console.log(game);
setInterval(function(){
	time = new Date().getTime();
	delta = oldTime - time;
	game.update(delta);
	oldTime = time;


}, 16);