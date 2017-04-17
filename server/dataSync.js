// How often to send game updates. Faster paced games will require a lower value for emitRate,
// so that updates are sent more often. Do some research and test what works for your game.

var dataSync = function() {};

dataSync.prototype = function() {
    var emitRate = 100;
    // This is what I call an 'emitter'. It is used to continuously send updates of the game world to all relevant clients.
    setInterval(function () {
        // Prepare the positions of the players, ready to send to all players.
        var dataToSend = collectPlayerData();

        // Send the data to all clients in the room called 'game-room'.
        io.in('game-room').emit('state_update', dataToSend);
    }, emitRate);
}


function collectPlayerData(players) {
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


module.exports = new dataSync();
