var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var hexy = require('../')();

server.listen(1337);

app.use(express.static(__dirname));
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/mobile-ui.html');
});

hexy.on('ready', function (){
	io.sockets.on('connection', function (socket) {
		console.log('New connection');
		io.sockets.emit('hexyIsReady'); // Emit connected status to client

		/**
		 * Head control
		 **/
		 socket.on('head', function (position) {
		 	hexy.head.turn(position);
		 });

		 /**
		  * Legs control
		  **/
		  socket.on('leg', function (leg, position) {
		  	hexy[leg].setFootY(position);
		  });

		  /**
		   * Kill all
		   **/
		   socket.on('killAll', function (position) {
		   	hexy.stop();
		   });
	});
});