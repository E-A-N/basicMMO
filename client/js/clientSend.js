
//Recieve Messages
Client.movePlayer = function(axis,speed){
    var data = {};
    data.axis = axis;
    data.force = speed;
    Client.socket.emit('move_player',data);
}

//New example of move player
Client.sendToServer("move_player", )

Client.changeColor = function(color){
    var data = {};
    data.tint = color;
    Client.socket.emit('changeGraphics',data);
}

function allocate(data){
    var allocatedData = {};
    var dataList = Object.keys(data);
    var allData = dataList.legnth;
    var member;
    for(var i = 0; i < allData; i++){
        member = dataList[i] + '';
        allocatedData[member] = data.dataList[i];
    }
}
