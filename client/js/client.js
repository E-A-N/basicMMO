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
