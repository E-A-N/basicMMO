//Declare Client, establish connection
var Client = {};
Client.socket = io("http://127.0.0.1:7777");

var NetEvents = function(){};
NetEvent.prototype.init = function(){
    this.movePlayer     = "movePlayer";
    this.changeGraphics = "changeGraphics";
}

NetEvents.prototype.sendToServer = function(message,data){
    /**
    * @param {string} message - message key used to pass to server
    * @param {object} data    - game mechanic related data to pass to server
    */
    this.socket.emit(message,data);
}
