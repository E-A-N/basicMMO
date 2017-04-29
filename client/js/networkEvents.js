//Declare Client, establish connection


var NetEvents = function(){};
var Client = new NetEvents;

NetEvents.prototype.init = function(ip){
    /**
    * @param {string} ip - ip address that will allow socket.io to interface with game client
    * @param {object} game - reference to the current phaser game
    */
    this.game = game;
    this.playerList = {};

    this.ip = ip || "http://127.0.0.1:7777";
    this.socket = io(this.ip);

    this.movePlayer     = "move_player";
    this.changeGraphics = "changeGraphics";

    //Messages FROM server
    this.stateUpdate    = "state_update";
    this.disconnect     = "disconnect";
    this.removePlayer   = "remove_player";
    this.joinedGame     = "join_game_success";

    //this.clientListen(); //listen for 'on' events



}

NetEvents.prototype.sendToServer = function(message,data){
    /**
    * @param {string} message - message key used to pass to server
    * @param {object} data    - game mechanic related data to pass to server
    */
    this.socket.emit(message,data);
}

//Check on player statuses
NetEvents.prototype.allocatePlayerss = function(message, data){
    switch(message){

        case this.stateUpdate:
            
            break;
    }

}

NetEvents.prototype.allocateGameData = function(data){
    /**
    * @param {object} data - A package of network data delivered from the server
    */
}

NetEvents.socket.on('state_update', NetEvents.allocateData);
