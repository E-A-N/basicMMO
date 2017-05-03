QUnit.test( "Client Attributes Test", testClientInstanceAttributes);


//Create and initialize test client object
var _tc = new NetEvents;
var ip = "http://127.0.0.1:7777";

//Create phaser game instance for testing
var testID = "testCanvas"
var testGame = new Phaser.Game(800,450,Phaser.AUTO, testID);
_tc.init(ip,testGame);

var hideGame = document.getElementById(testID);
hideGame.style.display = 'none';

function testClientInstanceAttributes(assert){
    //Define pass/fail message
    var goodTest = "Passed!";

    //Game Instance
    assert.ok(_tc.game !== null, "Phaser instance has passed!");

    //Server Message Attributes
    assert.ok(_tc.movePlayer === "movePlayer", goodTest);
    assert.ok(_tc.changeGraphics === "changeGraphics", goodTest);
    assert.ok(_tc.update === "stateUpdate", goodTest);
    assert.ok(_tc.disconnect === "disconnect", goodTest);
    assert.ok(_tc.removePlayer === "removePlayer", goodTest);
    assert.ok(_tc.addNewPlayer === "addNewPlayer", goodTest);
    assert.ok(_tc.addPlayers === "addPlayers", goodTest);
    assert.ok(_tc.joinedGame === "joinGameSuccess", goodTest);

}


function testClientPlayerAllocationMethod(assert){

    var goodTest = "Passed";



}
