var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

var game = new Phaser.Game(config);

game.scene.add('play',mainState);
game.scene.add('load',loadState);
game.scene.add('boot',bootState);

var score = 0;
var scoreText;
var gameOverText;

game.scene.start('boot');