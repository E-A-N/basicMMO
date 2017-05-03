QUnit.test( "Coercion Test", oneIsone);

function oneIsone(assert){
    assert.ok(1 !== "1", "Passed!");
    assert.ok(1 == "1", "Passed!");
}
