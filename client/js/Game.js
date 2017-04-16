
FunkyMultiplayerGame.Game = function () {
};

FunkyMultiplayerGame.Game.prototype = {

    create: function () {
        // Create an external reference to this function context so we can access this game state from the socket callbacks.
        _this = this;

        // Create an object to hold references to the player sprites.
        this.playerSprites = {};

        this.add.text(120, 20, "Use Up/Down/Left/Right\nkeys to move.", {
            font: "40px Arial",
            fill: '#ffffff',
            align: 'center'
        });
    },

    update: function () {
        if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            socket.emit('move_player', {axis: 'x', force: -1});
        }
        if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            socket.emit('move_player', {axis: 'x', force: 1});
        }
        if(this.input.keyboard.isDown(Phaser.Keyboard.UP)){
            socket.emit('move_player', {axis: 'y', force: -1});
        }
        if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            var downData = {axis: 'y', force: 1};
            socket.emit('move_player', downData);
        }
        //Change Color to random value
        if(this.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            var randomColor = Math.random() * 0xffffff;
            var properties = {tint: 'tint', color: randomColor };
            socket.emit('changeGraphics', properties);
        }

        if(this.input.keyboard.isDown(Phaser.Keyboard.SPACE)){
            //change back to original color
            console.log("Space has been pressed!! <3");
            var properties = {tint: 'tint', color: 0x0 };
            socket.emit('changeGraphics', properties);
        }

    }
};
