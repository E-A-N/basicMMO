
// Global reference to the active Phaser game state. This makes doing things with
// a state possible without actually being in the state file itself.
var _this;

// Connect to the Socket.io server that is running on localhost at port number 7777.
var socket = io("http://127.0.0.1:7777");

socket.on('join_game_success', function () {
    console.log("");
    console.log("* * * join_game_success event received from server.");
    console.log("* Starting Game state.");
    // This player joined the game. Start the 'Game' state.
    _this.state.start("Game");
});

socket.on('remove_player', function (data) {
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

var updateCount = 0;
socket.on('state_update', function (data) {

    // Uncomment the below code in an editor, save it and restart the client (refresh the page) to see the emitter output.
    /*updateCount += 1;
    console.log("");
    console.log("* * * state_update event received from server. Update count: " + updateCount);*/

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

// Create the game object for the game. This is what the
// Phaser states, and your own game data, are added on to.
FunkyMultiplayerGame = {};

FunkyMultiplayerGame.Boot = function () {
};

FunkyMultiplayerGame.Boot.prototype = {

    create: function () {
        _this = this;

        this.state.start('Preload');
    },

    events: (function () {
        socket.on('disconnect', function () {
            console.log("The server disconnected. ")
        });
    })()
};
