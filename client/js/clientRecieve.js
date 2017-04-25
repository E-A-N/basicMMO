var Client = {};

Client.socket = io("http://127.0.0.1:7777");

//Recieve Messages
Client.socket.on('join_game_success', function () {
    console.log("");
    console.log("* * * join_game_success event received from server.");
    console.log("* Starting Game state.");
    // This player joined the game. Start the 'Game' state.
    _this.state.start("Game");
});

Client.socket.on('remove_player', function (data) {
    console.log("");
    console.log("* * * remove_player event received from server.");
    // Check that the 'playerSprites' object exists on whatever the context is for '_this'.
    if(_this.playerSprites !== undefined){
        // Check that the player sprite to remove is actually in the list of player sprites.
        if(_this.playerSprites[data]){
            // Destroy the player sprite for the player to remove.
            _this.playerSprites[data].destroy();
            // Delete the property for that player.
            delete _this.playerSprites[data];
        }
    }
});


Client.socket.on('state_update', function (data) {

    // The server sent the positions of each player with this event. Update the position of each player's sprite.
    // Check that the 'playerSprites' object exists on whatever the context is for '_this'.
    if(_this.playerSprites !== undefined){
        // The 'playerSprites' object exists.
        var len = data.length;
        for(var i= 0; i < len; i += 1){
            // Check that there is a property on the 'playerSprites' with the key that matches this socket ID.
            if(_this.playerSprites[data[i].id]){
                // This player's sprite exists. Update its position.
                _this.playerSprites[data[i].id].x = data[i].x;
                _this.playerSprites[data[i].id].y = data[i].y;
                _this.playerSprites[data[i].id].tint = data[i].tint; //original tint value


                //data[i].graphics.change = data[i].graphics.change || false;
                //A color change needs to occur
                if (data[i].graphics) {
                    _this.playerSprites[data[i].id].tint = data[i].graphics.tint;
                    console.log("Color Change!!! <3");

                }
            }
            // No property was found for the player that this socket ID belongs to. Add a sprite for them.
            else {
                _this.playerSprites[data[i].id] = _this.add.sprite(data[i].x, data[i].y, 'red-fly');
            }
        }
    }

});
