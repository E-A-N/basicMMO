// Strict mode helps to prevent the use of weird things that you might do in javascript by accident.
"use strict";

// Gathering dependencies. The require(...) bit imports the stuff that was installed through npm.
var express = require('express');
// Create an Express app. Socket.io just sits on top of Express, but Express itself isn't
// used much, unless you want to serve files with it, but that is not recommended.
var app = express();
// Make a new HTTP server from Express. This doesn't get used itself either, unless you want to do stuff with it.
var server = require('http').Server(app);
// This is where Socket.io is set up. Socket takes in the HTTP server created above, and basically adds it's own
// layer on top of it that is nice and easy to use. 'io' is the Socket.io server object. You could call it
// 'socketIOServer' or something similar if you wish, but all of the documentation for Socket.io uses just 'io'.
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
