QUnit.test( "Client Attributes Test", testClientInstanceAttributes);
QUnit.test( "Client Player Data Allocation Test", testClientPlayerAllocationAddNewPlayer);

//Create and initialize test client object
var _tc = new NetEvents;
var ip = "http://127.0.0.1:7777";

//Create phaser game instance for testing
var testID = "testCanvas"
var testGame = new Phaser.Game(800,450,Phaser.AUTO, testID);
_tc.init(ip,testGame);

var hideGame = document.getElementById(testID);
hideGame.style.display = 'none'; //hide the phaser game from the GUI


///***TEST THE ATTRIBUTES OF THE CLIENT INSTANCE***///
function testClientInstanceAttributes(assert){


    //Game Instance
    assert.ok(_tc.game !== null, "Phaser instance has passed!");
    assert.ok(_tc.game.isRunning, "Phaser instance is running");

    //Server Message Attributes
    var res = " is good!";
    assert.ok(_tc.movePlayer === "movePlayer", _tc.movePlayer + res);
    assert.ok(_tc.changeGraphics === "changeGraphics", _tc.changeGraphics + res);
    assert.ok(_tc.update === "stateUpdate",  _tc.update + res);
    assert.ok(_tc.disconnect === "disconnect",  _tc.disconnect + res);
    assert.ok(_tc.removePlayer === "removePlayer",  _tc.removePlayer + res);
    assert.ok(_tc.addNewPlayer === "addNewPlayer",  _tc.addNewPlayer + res);
    assert.ok(_tc.addPlayers === "addPlayers",  _tc.addPlayers + res);
    assert.ok(_tc.joinedGame === "joinGameSuccess",  _tc.joinedGame + res);

}


function testClientPlayerAllocationAddNewPlayer(assert){
    /*
    Created psuedoData to pass as socket information.  This data acts as the
    ideal socket data being passed from the server
    */
    var id = "G-$$$$!!"
    var psuedoData = {};
    psuedoData.x = 150;
    psuedoData.y = 175;
    psuedoData.id = "G-$$$$!!";
    var msg = _tc.addNewPlayer;
    //pass data to be allocated
    _tc.allocatePlayers(msg,psuedoData);

    //get number of players in current game instance
    var playerAmount = Object.keys(_tc.playerList).length;

    //test allocation for player being added
    assert.ok(playerAmount === 1, "Player Succeffully Added!");

    //test allocation for player removal
    msg = _tc.removePlayer;
    _tc.allocatePlayers(msg);
    var newAmount = Object.keys(_tc.playerList).length;
    assert.ok(playerAmount === 0, "Player Successfully Destroyed!!");
}
