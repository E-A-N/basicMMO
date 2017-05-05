QUnit.test( "Client Attributes Test", testClientInstanceAttributes);
QUnit.test( "Client Player Data Allocation Test", testClientPlayerAllocationAddRemovePlayer);
QUnit.test( "Client Sprite Graphic Change Test", testClientSpriteGraphicChange);
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


function testClientPlayerAllocationAddRemovePlayer(assert){
    /*
    Created psuedoData to pass as socket information.  This data acts as the
    ideal socket data being passed from the server
    */

    var psuedoData = {};
    psuedoData.x = 150;
    psuedoData.y = 175;
    psuedoData.id = "G-$$$$!!";

    //test allocation for player being added
    var addData = _tc.addNewPlayer;
    var allocated1 = _tc.allocatePlayers(addData,psuedoData);
    var playerAmount = Object.keys(_tc.playerList).length;
    assert.ok(playerAmount === 1, "Player successfully added!");
    assert.ok(allocated1, "Player Data allocated succefully");

    //test allocation for player removal
    var destroyData = _tc.removePlayer;
    var allocated2 = _tc.allocatePlayers(destroyData, psuedoData);
    var newAmount = Object.keys(_tc.playerList).length;
    assert.ok(newAmount === 0, "Player Successfully Destroyed!!");
    assert.ok(allocated2, "Player Data allocated successfully");
}

function testClientSpriteGraphicChange(assert){
    /*

    */


    var testData1 = {};
    testData1.id = "Z-$$$$";
    testData1.tint = 0xf345e6;
    testData1.graphicUpdate = true;

}
