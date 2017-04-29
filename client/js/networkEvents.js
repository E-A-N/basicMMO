//Declare Client, establish connection


var NetEvents = function(){};
var Client = new NetEvents;

NetEvents.prototype.init = function(ip){
    /**
    * @param {string} ip - ip address that will allow socket.io to interface with game client
    */
    this.movePlayer     = "movePlayer";
    this.changeGraphics = "changeGraphics";

    this.ip = ip || "http://127.0.0.1:7777";
    this.socket = io(this.ip);
}

NetEvents.prototype.sendToServer = function(message,data){
    /**
    * @param {string} message - message key used to pass to server
    * @param {object} data    - game mechanic related data to pass to server
    */
    this.socket.emit(message,data);
}
