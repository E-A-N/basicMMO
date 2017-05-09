/**
*    WebSockets module
*    @module server/webSockets
*/

/** Start the Server! */
//exports = module.exports = function(io){
module.exports = function(io){
    console.log("Test Connection is up and running!!");
    io.on("connection",serverConnection);
}

function serverConnection(socket){
    socket.on("Herro Robo",function(data){
        var servData = {};
        servData.test1 = "Frosty Pookie Eddie Eddie!";
        socket.emit("serverResponse",servData);
    });
}
