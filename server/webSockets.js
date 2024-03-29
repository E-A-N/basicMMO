/**
*    WebSockets module
*    @module server/webSockets
*/

/** Start the Server! */
//exports = module.exports = function(io){
module.exports = function(io){

    var players = {};
    var graphicsUpdate = false;

    /** A new user has connected! */
    io.on('connection', function (socket) {
        console.log("* * * A new connection has been made.");
        console.log("* ID of new socket object: " + socket.id);

        socket.username = 'DEFAULT NAME';
        socket.score = 0;
        socket.isInGame = false;

        socket.on('change_username', function(data) {

            socket.username = data.username;
            console.log("* Username changed to: " + data.username);
        });

        /*
        socket.on('addNewPlayer', function(){
            socket.player = {
                x: 300,
                y: 300,
                tint: 0xffffff,
            };
        });
        */

        socket.on('join_game', function () {
            // Check that the player is not already in a game before letting them join one.
            if(socket.isInGame === false){
                // This player is now in a game.
                socket.isInGame = true;
                // Add a basic object that tracks player position to the list of players, using
                // the ID of this socket as the key for convenience, as each socket ID is unique.
                players[socket.id] = {
                    //Initiate default values for when character enter the game
                    x: 200,
                    y: 150,
                    tint: 0xffffff,
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
            graphicsUpdate = true;
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
            //Store color information in socket to update future players
            players[socket.id].tint = data.color;
            graphicsUpdate = true;
        });


        // When a client socket disconnects (closes the page, refreshes, timeout etc.),
        // then this event will automatically be triggered.
        socket.on('disconnecting', function () {

            //Notify self about disconnection
            console.log(socket.id + " has disconnted!");
            // Check if this player was in a game before they disconnected.
            if(socket.isInGame === true){
                // Remove this player from the player list.
                delete players[socket.id];

                //Inform all clients to also remove delted player
                io.in('game-room').emit('remove_player', socket.id);
            }
        });

    });

    function gatherPlayerData() {
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
                tint: players[key].tint,
                graphics: graphicsUpdate ? players[key].graphics : false,
				//graphics: players[key].graphics,
			}

            dataToSend.push(playerData);
        });
       //reset graphics state
    	graphicsUpdate = false;
        return dataToSend;
    }

    //begin serverloop with self evoking function
    (function serverLoop(loopRate){

        setInterval(function () {
            // Prepare the positions of the players, ready to send to all players.
            var sendData = gatherPlayerData();

            // Send the data to all clients in the room called 'game-room'.
            io.in('game-room').emit('state_update', sendData);
        }, loopRate);
    })(100); //the value passed in is taken as argument
}
