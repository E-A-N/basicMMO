
//Recieve Messages
Client.movePlayer = function(axis,speed){
    var data = {};
    data.axis = axis;
    data.force = speed;
    Client.socket.emit('move_player',data);
}

Client.changeColor = function(color){
    var data = {};
    data.tint = color;
    Client.socket.emit('changeGraphics',data);
}
