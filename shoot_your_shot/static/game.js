var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 900,
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
    
    var player1, player2;
    var p1color = 0xff0000;
    var p2color = 0x00ff00;
    var p1ammo = 0;
    var p2ammo = 0;
    var p1dir = 'left';
    var p2dir = 'right';

    var shot2 = false;
    var shot = false;
    var cooldownCounter = 0;
    var cooldownCounter2 = 0;
    var cooldown=50;
    var cooldown2=50;


    var downFlag1 = false;
    var downFlag2 = false;

    var fallFlag1 = false;
    var fallFlag2 = false;

    var jumps1 = 0;
    var jumps2 = 0;
    
    var ammoText1 = "";
    var ammoText2 = "";
    var ammo;
    var ammolocation = [
        [100, 100],
        [200, 100],
        [300, 100],
        [100, 400],
        [200, 400],
        [300, 400],
        [400, 100],
        [500, 100],
        [600, 100],
        [700, 100],
        [800, 100],
        [900, 100],
        [1000, 100],
        [1100, 100],
        [900, 400],
        [1000, 400],
        [1100, 400]
    ]

    
    var background;
    var bottom;
    var cursor;
    var shootKey, upKey2, downKey2, leftKey2, rightKey2, shootKey2, enterKey;
    var bulletspeed = 1000;
    var playerspeed = 500;
    var ultspeed = 800;

    var game = new Phaser.Game(config);

    function preload () {
        this.load.image('background', 'background.png');
        this.load.image('ground', 'bottom.png');
        this.load.image('platform', 'platforms.png');
        this.load.image('shot', 'shot.png');
        this.load.image('ammo', 'ammo.png');
        this.load.image('sprite', 'sprite.png');
    }


    function create () {

        this.add.image(600, 450, 'background');

        cursors = this.input.keyboard.createCursorKeys();
        shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA);
        ultimateKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);

        upKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        downKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        leftKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        rightKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        shootKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        ultimateKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);

        enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        

        platforms = this.physics.add.staticGroup();
        platforms.create(100, 200, 'platform');
        platforms.create(1100, 200, 'platform');
        platforms.create(600, 400, 'platform');
        platforms.create(100, 600, 'platform');
        platforms.create(1100, 600, 'platform');

        ground = this.physics.add.staticGroup();
        ground.create(600, 900, 'ground');


        player1 = this.physics.add.sprite(1100, 650, 'sprite');
        player1.setBounce(0.2);
        player1.setCollideWorldBounds(true);
        player1.body.setGravityY(300);
        player1.setTint(p1color);

        player2 = this.physics.add.sprite(100, 650, 'sprite');
        player2.setBounce(0.2);
        player2.setCollideWorldBounds(true);
        player2.body.setGravityY(300);
        player2.setTint(p2color);

        ammo = this.physics.add.group();
        ammolocation.forEach(function(location){
            ammo.create(location[0], location[1], 'ammo');
        });
        
        ammo.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        bullets1 = this.physics.add.group();   
        bullets2 = this.physics.add.group();         
        this.physics.add.overlap(player1, bullets2, hitbullet, null, this);
        this.physics.add.overlap(player2, bullets1, hitbullet, null, this);
        
        ammoText1 = this.add.text(1000, 830, 'Ammo: 0', { fontSize: '32px', fill: '#000' });
        ammoText2 = this.add.text(50, 830, 'Ammo: 0', { fontSize: '32px', fill: '#000' });
        this.physics.add.collider(player1, platforms);
        this.physics.add.collider(player1, ground);
        this.physics.add.collider(player2, platforms);
        this.physics.add.collider(player2, ground);
        this.physics.add.collider(ammo, platforms);
        this.physics.add.collider(ammo, ground);
        // this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player1, ammo, collectAmmo, null, this); // run collectAmmo if overlap
        this.physics.add.overlap(player2, ammo, collectAmmo, null, this);
    }

    function hitbullet (pr, bullet){
        if (pr === player1){
            endText = this.add.text(500, 150, 'P2 WINS', { fontSize: '32px', fill: '#fff' });
            player1.setTint(0xffffff);
        } else if (pr === player2) {
            endText = this.add.text(500, 150, 'P1 WINS', { fontSize: '32px', fill: '#fff' });
            player2.setTint(0xffffff);
        }
        this.physics.pause();
        p1ammo = 0;
        p2ammo = 0;
        gameOver = true;
        
    }

    function collectAmmo (pr, a) {

        a.disableBody(true, true);
        
        if (pr == player1){
            p1ammo += 3;
            ammoText1.setText('Ammo: ' + p1ammo);
        } else{
            p2ammo += 3;
            ammoText2.setText('Ammo: ' + p2ammo);
        }
        
        if (ammo.countActive(true) === 0){
            ammolocation.forEach(function(location){
                ammo.create(location[0], location[1], 'ammo');
            });
            
            ammo.children.iterate(function (child) {
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            });

        }
        
    }

    function update () { // movement and changes
        // MOVEMENT    

        if (cursors.left.isDown) {
            player1.setVelocityX(-1 * playerspeed);
            p1dir = 'left';
        }
        else if (cursors.right.isDown) {
            player1.setVelocityX(playerspeed);
            p1dir = 'right';
        }
        else {
            player1.setVelocityX(0);
        }

        if (leftKey2.isDown) {
            player2.setVelocityX(-1 * playerspeed);
            p2dir = 'left';
        }
        else if (rightKey2.isDown) {
            player2.setVelocityX(playerspeed);
            p2dir = 'right'
        }
        else {
            player2.setVelocityX(0);
        }

        // // SHOOTING

        if (shot2 == true){
            cooldownCounter2 += 1
        }
        if (cooldownCounter2 == cooldown2){
            shot2 = false
            cooldownCounter2 = 0
        }
        if (shot2 == false & shootKey2.isDown & p2ammo >= 1){
            bullet2 = bullets2.create(player2.x, player2.y, 'shot');
            bullet2.setTint(p2color);
            if (p2dir == 'left'){
                bullet2.setVelocityX(-1 * bulletspeed);
                bullet2.body.gravity.y = -300;
            } else {
                bullet2.setVelocityX(bulletspeed);
                bullet2.body.gravity.y = -300;
            }
            p2ammo -= 1
            ammoText2.setText('Ammo: ' + p2ammo);
            shot2 = true
        }

        if (shot == true){
            cooldownCounter += 1
        }
        if (cooldownCounter == cooldown){
            shot = false
            cooldownCounter = 0
        }
        if (shot == false & shootKey.isDown & p1ammo >= 1){
            bullet1 = bullets1.create(player1.x, player1.y, 'shot');
            bullet1.setTint(p1color);
            if (p1dir == 'left'){
                bullet1.setVelocityX(-1 * bulletspeed);
                bullet1.body.gravity.y = -300;
            } else {
                bullet1.setVelocityX(bulletspeed);
                bullet1.body.gravity.y = -300;
            }
            p1ammo -= 1
            ammoText1.setText('Ammo: ' + p1ammo);
            shot = true
        }

        // Ultimate Move

        if (shot2 == true){
            cooldownCounter2 += 1
        }
        if (cooldownCounter2 == cooldown2){
            shot2 = false
            cooldownCounter2 = 0
        }
        if (shot2 == false & ultimateKey2.isDown & p2ammo >= 5){
            bullet2a = bullets2.create(player2.x, player2.y, 'shot');
            bullet2b = bullets2.create(player2.x, player2.y, 'shot');
            bullet2c = bullets2.create(player2.x, player2.y, 'shot');
            bullet2d = bullets2.create(player2.x, player2.y, 'shot');
            bullet2e = bullets2.create(player2.x, player2.y, 'shot');
            bullets2.children.iterate(function (child) {
                child.setTint(p2color);
            });
            if (p2dir == 'left'){
                bullet2a.setVelocityX(-ultspeed);
                bullet2a.body.gravity.y = -300;
                bullet2b.setVelocityX(-ultspeed);
                bullet2b.body.gravity.y = -450;
                bullet2c.setVelocityX(-ultspeed);
                bullet2c.body.gravity.y = -600;
                bullet2d.setVelocityX(-ultspeed);
                bullet2d.body.gravity.y = -150;
                bullet2e.setVelocityX(-ultspeed);
                bullet2e.body.gravity.y = 0;
            } else {
                bullet2a.setVelocityX(ultspeed);
                bullet2a.body.gravity.y = -300;
                bullet2b.setVelocityX(ultspeed);
                bullet2b.body.gravity.y = -450;
                bullet2c.setVelocityX(ultspeed);
                bullet2c.body.gravity.y = -600;
                bullet2d.setVelocityX(ultspeed);
                bullet2d.body.gravity.y = -150;
                bullet2e.setVelocityX(ultspeed);
                bullet2e.body.gravity.y = 0;
            }
            p2ammo -= 5
            ammoText2.setText('Ammo: ' + p2ammo);
            shot2 = true
        }

        if (shot == true){
            cooldownCounter += 1
        }
        if (cooldownCounter == cooldown){
            shot = false
            cooldownCounter = 0
        }
        if (shot == false & ultimateKey.isDown & p1ammo >= 5){
            bullet1a = bullets1.create(player1.x, player1.y, 'shot');
            bullet1b = bullets1.create(player1.x, player1.y, 'shot');
            bullet1c = bullets1.create(player1.x, player1.y, 'shot');
            bullet1d = bullets1.create(player1.x, player1.y, 'shot');
            bullet1e = bullets1.create(player1.x, player1.y, 'shot');
            bullets1.children.iterate(function (child) {
                child.setTint(p1color);
            });
            if (p1dir == 'left'){
                bullet1a.setVelocityX(-ultspeed);
                bullet1a.body.gravity.y = -300;
                bullet1b.setVelocityX(-ultspeed);
                bullet1b.body.gravity.y = -450;
                bullet1c.setVelocityX(-ultspeed);
                bullet1c.body.gravity.y = -600;
                bullet1d.setVelocityX(-ultspeed);
                bullet1d.body.gravity.y = -150;
                bullet1e.setVelocityX(-ultspeed);
                bullet1e.body.gravity.y = 0;
            } else {
                bullet1a.setVelocityX(ultspeed);
                bullet1a.body.gravity.y = -300;
                bullet1b.setVelocityX(ultspeed);
                bullet1b.body.gravity.y = -450;
                bullet1c.setVelocityX(ultspeed);
                bullet1c.body.gravity.y = -600;
                bullet1d.setVelocityX(ultspeed);
                bullet1d.body.gravity.y = -150;
                bullet1e.setVelocityX(ultspeed);
                bullet1e.body.gravity.y = 0;
            }
            p1ammo -= 5
            ammoText1.setText('Ammo: ' + p1ammo);
            shot = true
        }
        // DOUBLE JUMPING
        if (player1.body.touching.down){
            jumps1 = 2;
            if (fallFlag1){
                player1.body.acceleration.y = 0;
                fallFlag1 = false
            }
        }
        if (downFlag1 == true && cursors.up.isDown){ 
        } 
        else if (downFlag1 == true && !(cursors.up.isDown)){
            jumps1 -= 1
            downFlag1 = false
        } 
        else if(cursors.up.isDown && jumps1 > 0){
            player1.setVelocityY(-420);
            downFlag1 = true
        } 

        if (player2.body.touching.down){
            jumps2 = 2;
            if (fallFlag2){
                player2.body.acceleration.y = 0;
                fallFlag2 = false
            }
        }
        if (downFlag2 == true && upKey2.isDown){ 
        } 
        else if (downFlag2 == true && !(upKey2.isDown)){
            jumps2 -= 1
            downFlag2 = false
        } 
        else if(upKey2.isDown && jumps2 > 0){
            player2.setVelocityY(-420);
            downFlag2 = true
        } 

        // FAST FALL
        
        if (!fallFlag1 & !player1.body.touching.down && cursors.down.isDown){
            player1.body.acceleration.y = 3000;
            fallFlag1 = true;
        }
        if (!fallFlag2 & !player2.body.touching.down && downKey2.isDown){
            player2.body.acceleration.y = 3000;
            fallFlag2 = true;
        }

        // RESTART
        if (enterKey.isDown && gameOver){
            this.scene.restart();
        }
    }