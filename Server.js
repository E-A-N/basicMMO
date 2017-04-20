// Strict mode helps to prevent the use of weird things that you might do in javascript by accident.
"use strict";

var express = require('express');.
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//use path object to make server platform agnostic
var path	= require('path');

//retrieve main server logic
var servRoute = path.join(__dirname,'server','dataSync');
servRoute = path.normalize(servRoute);
var dataSync = require(servRoute)(io);

//open port for game to be played on
var sitePath = process.argv[2] || ".";
var port = 7777;

var gameRoute = path.join(__dirname,'client',sitePath);
gameRoute = path.normalize(gameRoute);

/*
//request logging
app.use(function(req, res, next) {
	console.log(req.url);
	next();
});
*/
//start server
console.log(sitePath);
console.log("Starting server in: " + gameRoute);

app.use(express.static(gameRoute));
server.listen(port, function() {
	console.log("Server running at: http://localhost:" + port);
});
