
//Recieve Messages
Client.movePlayer = function(axis,speed){
    var data = {};
    data.axis = axis;
    data.speed = speed;
    Client.socket.emit('move_player',data);
}
