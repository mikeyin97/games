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
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
    };
    var count = 0;
    var player;
    var stars;
    var bombs;
    var platforms;
    var cursors;
    var score = 0;
    var score2 = 0;
    var gameOver = false;
    var scoreText;
    var scoreText2;
    var downFlag = false;
    var downFlag2 = false;
    var jumpFlag;
    var jumps = 2;
    var jumps2 = 2;
    var endText;
    var bullets;
    var bullet;
    var cooldown=20;
    var cooldown2=20;
    var cooldownCounter = 0;
    var cooldownCounter2 = 0;
    var shot2 = false;
    var shot = false;
    var p2dir = 'left';
    var p1dir = 'right';

    var upKey2;
    var downKey2;
    var leftKey2;
    var rightKey2;
    var enterKey;

    var game = new Phaser.Game(config);

    function preload () {
        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star.png');
        this.load.image('bomb', 'bomb.png');
        this.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 });
    }


    function create () {
        this.add.image(400, 300, 'sky');
        cursors = this.input.keyboard.createCursorKeys();
        shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        upKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        downKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        leftKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        rightKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        shootKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');


        player = this.physics.add.sprite(700, 450, 'dude').setInteractive({ cursor: 'pointer' });
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.body.setGravityY(300);

        player2 = this.physics.add.sprite(100, 450, 'dude').setInteractive({ cursor: 'pointer' });
        player2.setBounce(0.2);
        player2.setCollideWorldBounds(true);
        player2.body.setGravityY(300);
        player2.setTint(0x4d4d4d);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1 //loop
        });

        this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,  // to get 12
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        bombs = this.physics.add.group();
        this.physics.add.collider(bombs, platforms);            
        this.physics.add.collider(player, bombs, hitBomb, null, this);
        this.physics.add.collider(player2, bombs, hitBomb, null, this);

        bullets1 = this.physics.add.group();   
        bullets2 = this.physics.add.group();         
        this.physics.add.collider(player, bullets2, hitBomb, null, this);
        this.physics.add.collider(player2, bullets1, hitBomb, null, this);
        
        
        scoreText = this.add.text(50, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        scoreText2 = this.add.text(580, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player2, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this); // run collectstar if overlap
        this.physics.add.overlap(player2, stars, collectStar, null, this);
    }

    function hitBomb (pr, bomb){
        if (pr === player){
            endText = this.add.text(320, 250, 'P2 WINS', { fontSize: '32px', fill: '#000' });
            player.setTint(0xff0000);
        } else if (pr === player2) {
            endText = this.add.text(320, 250, 'P1 WINS', { fontSize: '32px', fill: '#000' });
            player2.setTint(0xff0000);
        }
        this.physics.pause();
        gameOver = true;
        
    }

    function collectStar (pr, star) {

        star.disableBody(true, true);
        
        if (pr == player){
            score += 10;
            scoreText.setText('score: ' + score);
            if (score == 20){
                endText = this.add.text(320, 250, 'P1 WINS', { fontSize: '32px', fill: '#000' });
                score = 0;
                score2 = 0;
                this.physics.pause();
                gameOver = true;
            }
        } else{
            score2 += 10;
            scoreText2.setText('score: ' + score2);
            if (score2 == 200){
                endText = this.add.text(320, 250, 'P2 WINS', { fontSize: '32px', fill: '#000' });
                score = 0;
                score2 = 0;
                this.physics.pause();
                gameOver = true;
            }
        }
        
        if (stars.countActive(true) === 0){
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
            var x = (pr.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
        
    }

    function update () { // movement and changes    
        if (cursors.left.isDown) {
            player.setVelocityX(-200);
            //player.body.acceleration.x = -10;
            p1dir = 'left';
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(200);
            p1dir = 'right';
            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (leftKey2.isDown) {
            player2.setVelocityX(-200);
            //player2.body.acceleration.x = -10;
            p2dir = 'left';
            player2.anims.play('left', true);
        }
        else if (rightKey2.isDown) {
            player2.setVelocityX(200);
            p2dir = 'right'
            player2.anims.play('right', true);
        }
        else {
            player2.setVelocityX(0);

            player2.anims.play('turn');
        }

        // SHOOTING

        if (shot2 == true){
            cooldownCounter2 += 1
        }
        if (cooldownCounter2 == cooldown2){
            shot2 = false
            cooldownCounter2 = 0
        }
        if (shot2 == false & shootKey2.isDown){
            bullet2 = bullets2.create(player2.x, player2.y, 'bomb');
            bullet2.setTint(0x000000);
            if (p2dir == 'left'){
                bullet2.setVelocityX(-300);
                bullet2.body.acceleration.y = -300;
            } else {
                bullet2.setVelocityX(300);
                bullet2.body.acceleration.y = -300;
            }
            
            shot2 = true
        }

        if (shot == true){
            cooldownCounter += 1
        }
        if (cooldownCounter == cooldown){
            shot = false
            cooldownCounter = 0
        }
        if (shot == false & shootKey.isDown){
            bullet1 = bullets1.create(player.x, player.y, 'bomb');
            if (p1dir == 'left'){
                bullet1.setVelocityX(-300);
                bullet1.body.acceleration.y = -300;
            } else {
                bullet1.setVelocityX(300);
                bullet1.body.acceleration.y = -300;
            }
            
            shot = true
        }

        // DOUBLE JUMPING
        if (player.body.touching.down){
            jumps = 2;
        }
        if (downFlag == true && cursors.up.isDown){ 
        } 
        else if (downFlag == true && !(cursors.up.isDown)){
            jumps -= 1
            downFlag = false
        } 
        else if(cursors.up.isDown && jumps > 0){
            player.setVelocityY(-400);
            downFlag = true
        } 

        if (player2.body.touching.down){
            jumps2 = 2;
        }
        if (downFlag2 == true && upKey2.isDown){ 
        } 
        else if (downFlag2 == true && !(upKey2.isDown)){
            jumps2 -= 1
            downFlag2 = false
        } 
        else if(upKey2.isDown && jumps2 > 0){
            player2.setVelocityY(-400);
            downFlag2 = true
        } 

        if (enterKey.isDown && gameOver){
            this.scene.restart();
        }
    }