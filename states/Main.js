var mainState = {


    create: function()
    {

        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        player = this.physics.add.sprite(100, 450, 'dude');
        this.physics.add.collider(player, platforms);

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        bombs = this.physics.add.group();

        this.physics.add.collider(bombs, platforms);

        this.physics.add.collider(player, bombs, function(){

            this.physics.pause();

            player.setTint(0xff0000);

            player.anims.play('turn');

            gameOverText = this.add.text(300, 250, 'GAME OVER', { fontSize: '32px', fill: '#f21f23' });

        }, null, this);

        var stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, function(player,star) {
            star.disableBody(true, true);

            score += 10;
            scoreText.setText('Score: ' + score);

            if (stars.countActive(true) === 0) {
                stars.children.iterate(function (child) {

                    child.enableBody(true, child.x, 0, true, true);

                });

                var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

                var bomb = bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

            }
        }, null, this);


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
            frameRate: 17,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 3 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 6 }),
            frameRate: 17,
            repeat: -1
        });
    },
    update: function(){
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }

    }

};