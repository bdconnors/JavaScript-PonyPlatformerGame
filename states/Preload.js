var loadState = {
    preload: function () {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/pinkie.png',
            { frameWidth: 64, frameHeight: 53 }
        );
    },
    create: function () {
        game.scene.start('play');
    }
};