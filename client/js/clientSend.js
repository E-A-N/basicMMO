
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

Client.sendToServer = function(message, data){
    var allocatedData = {};
    switch(message){
        case 'move_player'





    }
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
