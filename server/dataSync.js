exports = module.exports = function(io){

    var players = {};
    var graphicsUpdate = false;

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
        var dataToSend = gatherPlayerData();

        // Send the data to all clients in the room called 'game-room'.
        io.in('game-room').emit('state_update', dataToSend);
    }, emitRate);

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
    					graphics: graphicsUpdate ? players[key].graphics : false,
    					//graphics: players[key].graphics,
    				}

            dataToSend.push(playerData);
        });
    		//reset graphics state

    		graphicsUpdate = false;
        return dataToSend;
    }
}
