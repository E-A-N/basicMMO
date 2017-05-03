QUnit.test( "Client Attributes Test", testClientAttributes);

function testClientAttributes(assert){
    //Define pass/fail message
    var goodTest = "Passed!";

    //Create and initialize test client object
    var _tc = new NetEvents;
    var ip = "http://127.0.0.1:7777";
    var game = {}; //for testing only this value represents phaser instance
    _tc.init(ip,game);

    assert.ok(_tc.movePlayer === "movePlayer", goodTest);
    assert.ok(_tc.changeGraphics === "changeGraphics", goodTest);
    assert.ok(_tc.update === "stateUpdate", goodTest);
    assert.ok(_tc.disconnect === "disconnect", goodTest);
    assert.ok(_tc.removePlayer === "removePlayer", goodTest);
    assert.ok(_tc.addNewPlayer === "addNewPlayer", goodTest);
    assert.ok(_tc.addPlayers === "addPlayers", goodTest);
    assert.ok(_tc.joinedGame === "joinGameSuccess", goodTest);
}
