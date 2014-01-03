var io = require('socket.io').listen(8080);
io.set('log level', 1);
var ServerHandler = require('./lib/server_handler.js');

var db = require('./lib/database.js');

io.sockets.on('connection', ServerHandler);