// Strict mode helps to prevent the use of weird things that you might do in javascript by accident.
"use strict";

var express = require('express');.
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

<<<<<<< HEAD
//handle the servers update loop
//var dataSync = require('server/dataSync.js');
=======
//use path object to make server platform agnostic
var path	= require('path');
>>>>>>> c21c5c01d1501cc205ab1beb1733581553bf33cf

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
<<<<<<< HEAD

//server.listen(7777, "127.0.0.1");



// Used to manage players in the game. See the slightly more advanced stuff
// after you understand everything else and are done with the basics.
var players = {};

var graphicsUpdate = false;
/** *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
 *  *   *   * Some useful stuff you can do with Socket.io   *   *   *   *
 *  *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
 *
 *  socket.on('event_name', function(optionalData){ ... );  - Adds an event listener to this socket.
 *  io.emit('event_name', optionalData);                    - Sends an event to all sockets.
 *  socket.emit('event_name', optionalData);                - Sends an event to this socket.
 *  socket.broadcast.emit('event_name', optionalData);      - Sends an event to all sockets except this one.
 *  io.in('room-name').emit('event_name', optionalData);    - Sends an event to all sockets that are in the specified room.
 *  socket.join('room-name');                               - Adds a socket to a room.
 *  socket.leave('room-name');                              - Removes a socket from a room.
*/

// A 'socket' it just an object that manages a client's connection to the server. For each client that connects to
// this server, they will get their own socket object. These socket objects are stored internally on the io object,
// and can be accessed manually with 'io.sockets' to get a list of the connected sockets, but you shouldn't really need to.

// The first time a connection is made with a new socket (a client), the 'connection' event is triggered
// on io (the Socket.io server object), and it runs the 'connection' callback function (the 'function(socket){ ... }' part).
// The socket object for the client that connected is sent to the callback, and this allows us to do stuff with that
// socket, such as adding event listeners to that socket, which is what is done below.
//                            v The socket object is passed in automatically by io when a connection is made.
io.on('connection', function (socket) {
    console.log("* * * A new connection has been made.");
    // Each socket object (one for each connected client) has an 'id' property,
    // which can be used to uniquely identify each socket connection.
    // Check the command line that was used to start the server to see
    // the id of each socket that connects being printed.
    console.log("* ID of new socket object: " + socket.id);

    // Using the socket object that was passed in, events can be sent to the
    // client that socket belongs to using .emit(...)
    // The socket object on the client (see Boot.js in /client/js) should have event
    // listeners of the event name that you are sending to it, or it won't pick them up.

    // So if the server emits 'super_event', then the client must also be listening
    // for 'super_event', and vice versa for when the client sends events to the server.

    // In this case, an event called 'hello_client' is sent, and the (optional) second
    // parameter is any data you might want to send along with the event.
    socket.emit('hello_client', {crazyString: 'abc123', coolArray: [40, 'beep', true]});
    // Or with no data, just an event.
    socket.emit('how_are_you');
    // An event that the client isn't listening for, so will be ignored when the client receives it.
    socket.emit('anyone_there');

    // You can add your own properties onto the socket object like any other object.
    // Useful if you want to store player data like a score, username, or a flag of
    // whether they are currently in a game.
    socket.username = 'DEFAULT NAME';
    socket.score = 0;
    socket.isInGame = false;

    // Event listeners can be added to this socket. Every time the client sends
    // an event to this server, the server will look to see if the name of that event
    // matches any events that this socket is listening for.

    // In this case, an event listener is being added that will listen for an event
    // called 'change_username', and giving it a callback function to run whenever the
    // event is received. When the client sends this event, they can also pass along data.
    // The data that is sent is automatically passed in to the callback as the first argument.
    socket.on('change_username', function(data) {
        // Update the player's username with the data that they sent from their client.
        // The name of the property that you access on the data object must match how it
        // looks when the client sent it.
        socket.username = data.username;
        console.log("* Username changed to: " + data.username);
    });

    socket.on('im_fine', function (/* No data was sent by the client for this event. You could put 'data' here but it would just be undefined. */) {
        socket.emit('good_to_hear');
    });

    socket.on('join_game', function () {
        // Check that the player is not already in a game before letting them join one.
        if(socket.isInGame === false){
            // This player is now in a game.
            socket.isInGame = true;
            // Add a basic object that tracks player position to the list of players, using
            // the ID of this socket as the key for convenience, as each socket ID is unique.
            players[socket.id] = {
                x: 200,
                y: 150
            };
            // Add this socket to the room for the game. A room is an easy way to group sockets, so you can send events to a bunch of sockets easily.
            // A socket can be in many rooms.
            socket.join('game-room');

            // Tell the client that they successfully joined the game.
            socket.emit('join_game_success');
            console.log("* " + socket.username + " joined a game.");
        }
        else {
            console.log("* " + socket.username + " is already in a game.");
        }
    });

    socket.on('move_player', function (data) {
        // Access the object in the list of players that has the key of this socket ID.
        // 'data.axis' is the axis to move in, x or y.
        // 'data.force' is which direction on the given axis to move, 1 or -1.
        // So if the axis is 'y', and the force is -1, then the player would move up.
        // Change the * 2 multiplier to change the movement speed.
        players[socket.id][data.axis] += data.force * 2;
    });

    socket.on('changeGraphics', function (data) {

        //Communicate to the client that a color change needs to occur
				console.log(`${socket.id} wants their color changed!`)

        //Adjust sprite tint
        players[socket.id].graphics = {
            change: true,
            tint : data.color,
        };
        graphicsUpdate = true;
    });


    // When a client socket disconnects (closes the page, refreshes, timeout etc.),
    // then this event will automatically be triggered.
    socket.on('disconnecting', function () {
        // Check if this player was in a game before they disconnected.
        if(socket.isInGame === true){
            // Remove this player from the player list.
            delete players[socket.id];
            // This player was in a game and has disconnected, but the other players still in the game don't know that.
            // We need to tell the other players to remove the sprite for this player from their clients.
            // All of the players still in the game are in the room called 'game-room', so emit an event called 'remove_player'
            // to that room, sending with it the key of the property to remove.
            io.in('game-room').emit('remove_player', socket.id);
        }
    });

});

// How often to send game updates. Faster paced games will require a lower value for emitRate,
// so that updates are sent more often. Do some research and test what works for your game.
var emitRate = 100;
// This is what I call an 'emitter'. It is used to continuously send updates of the game world to all relevant clients.
setInterval(function () {
    // Prepare the positions of the players, ready to send to all players.
    var dataToSend = preparePlayersDataToSend();

    // Send the data to all clients in the room called 'game-room'.
    io.in('game-room').emit('state_update', dataToSend);
}, emitRate);

function preparePlayersDataToSend() {
    // Prepare the positions of the players, ready to send to all players.
    var dataToSend = [];
    // 'players' is an object, so get a list of the keys.
    var keys = Object.keys(players);
    // Loop though the list of players and get the position of each player.
    keys.forEach(function (key) {
        // Add the position (and ID, so the client knows who is where) to the data to send.
				var playerData = {
				  id: key,
					x: players[key].x,
					y: players[key].y,
					graphics: graphicsUpdate ? players[key].graphics : false,
					//graphics: players[key].graphics,
				}

        dataToSend.push(playerData);
    });
	//reset graphics state
	graphicsUpdate = false;
    return dataToSend;
}
=======
>>>>>>> c21c5c01d1501cc205ab1beb1733581553bf33cf
