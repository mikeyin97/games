
function preload(){
    this.load.image('sprite', 'sprite.png');
    this.load.image('ammo', 'ammo.png');
    this.load.image('sky', 'sky.png');
    this.load.image('background', 'background.png');
    this.load.image('ground', 'bottom.png');
    this.load.image('platform', 'platforms.png');
    this.load.image('shot', 'shot.png');
    this.load.image('dirt', 'ground.png');
    this.load.image('textbox', 'textbox.png');
    this.load.spritesheet('player', 'guy.png', { frameWidth: 32, frameHeight: 48 });
}

function create(){
        
    

    count = 0
    interactFlag = false;
    interactSwitch = false;
    this.add.image(1300, -600, 'background');
    cursors = this.input.keyboard.createCursorKeys();
    interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    platforms = this.physics.add.staticGroup();
    platforms.create(-200, 700, 'dirt');
    platforms.create(100, 700, 'dirt');
    platforms.create(400, 700, 'dirt');
    platforms.create(700, 700, 'dirt');
    platforms.create(1000, 700, 'dirt');
    platforms.create(1300, 700, 'dirt');

    textboxs = this.physics.add.staticGroup();

   

    textbox = textboxs.create(450, 480, 'textbox');
    textbox.setScrollFactor(0);
    textbox.visible = false;
    textbox.alpha = 0.5;

    npcs = this.physics.add.group();
    npc1 = npcs.create(800, 400, 'sprite');
    npc1.setBounce(0);
    npc1.setCollideWorldBounds(false);
    npc1.body.setGravityY(300);
    npc1.setTint(0x00ff00);
    npc1.text = "HI Mike"
    npc1.name = "Granny Yin"

    indicators = this.physics.add.group();

    npc1indicator = indicators.create(npc1.x, npc1.y - 20, 'ammo');
    npc1indicator.setGravityY(-300);

    npc1.profile = textboxs.create(100, 480, 'player');
    npc1.profile.setScrollFactor(0);
    npc1.profile.visible = false;
    //npc1.setVelocityX(-100);
    
    timer = this.time.addEvent({
        delay: 2000,                // ms
        callback: moveNPC,
        args: [npc1, npc1indicator, count],
        loop: true
    });
    player1 = this.physics.add.sprite(400, 300, 'player');
    player1.setBounce(0);
    player1.setCollideWorldBounds(false);
    player1.body.setGravityY(300);
    textstyle = { fontSize: '20px', fill: '#ffffff', stroke: '#ffffff', strokeThickness: 0, alpha: 0.7};
    textstyle2 = { fontSize: '25px', fill: '#ffffff', stroke: '#ffffff', strokeThickness: 0};
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
        frameRate: 7,
        repeat: -1 //loop
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
        frameRate: 7,
        repeat: -1
    });
    
    this.anims.create({
        key: 'faceleft',
        frames: [ { key: 'player', frame: 0 } ],
        frameRate: 20
    });   
    
    this.anims.create({
        key: 'faceright',
        frames: [ { key: 'player', frame: 7 } ],
        frameRate: 20
    });  

    interactText1 = this.add.text(200, 425, '', textstyle2);
    interactText2 = this.add.text(200, 465, '', textstyle);
    interactText3 = this.add.text(200, 490, '', textstyle);
    
    this.cameras.main.startFollow(player1);
    interactText1.setScrollFactor(0);
    interactText2.setScrollFactor(0);
    interactText3.setScrollFactor(0);
    this.physics.add.collider(npcs, platforms);
    this.physics.add.collider(player1, platforms);
}

function moveNPC(obj, ind, count){
    console.log(NPCcount);
    if (NPCcount == 0){
        console.log(obj.x)
        obj.setVelocityX(-50);
        ind.setVelocityX(-50);
    } else if (NPCcount == 1){
        obj.setVelocityX(-50);
        ind.setVelocityX(-50);
    } else if (NPCcount == 2){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount == 3){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount == 4){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount == 5){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount == 6){
        obj.setVelocityX(50);
        ind.setVelocityX(50);
    } else if (NPCcount == 7){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount == 8){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount == 9){
        obj.setVelocityX(50);
        ind.setVelocityX(50);
    } else if (NPCcount == 10){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount == 11){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount == 12){
        obj.setVelocityX(50);
        ind.setVelocityX(50);
    } else if (NPCcount == 13){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount == 14){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount == 15){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount == 16){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount == 17){
        obj.setVelocityX(-50);
        ind.setVelocityX(-50);
    } else if (NPCcount == 18){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    }
    
    if (NPCcount == 18){
        NPCcount = -1
    }
    NPCcount += 1
}

function remove(obj){
    //obj.disableBody(true, true);
    fadeOutDestroy(obj, 100);
}

function update(){
    //NPC 1 only
    if (!interactFlag & player1.body.touching.down & player1.x > npc1.x-30 & player1.x < npc1.x+30 & interactKey.isDown){
        if (!interactSwitch){
            interactSwitch = true;
            interactFlag = true;
            textbox.visible = true;
            interactText1.setText(npc1.name);
            interactText2.setText(npc1.text);
            npc1.profile.visible = true;
        }
    }
    if (interactKey.isUp) {
        interactSwitch = false
    }

    if (interactFlag & interactKey.isDown){
        if (!interactSwitch){
            console.log('hi')
            interactSwitch = true;
            interactFlag = false;
            textbox.visible = false;
            interactText1.setText("");
            interactText2.setText("");
            interactText3.setText("");
            npc1.profile.visible = false;
        }
    }

    if (player1.body.touching.down){
        if (fallFlag){
            player1.body.acceleration.y = 0;
            fallFlag = false
        }
    }
    if (cursors.left.isDown) {
        player1.setVelocityX(-200);
        
        player1.anims.play("left", true); 
        face = "left";
    }
    else if (cursors.right.isDown) {
        player1.setVelocityX(200);
        player1.anims.play('right', true); 
        face = "right";
    }
    else {
        player1.setVelocityX(0);
        if (face === "right"){
            player1.anims.play('faceright', true); 
        } else{
            player1.anims.play('faceleft', true); 
        }
        
    }

    if (cursors.up.isDown && player1.body.touching.down){
        player1.setVelocityY(-350);
    }
    if (!fallFlag & !player1.body.touching.down && cursors.down.isDown){
        player1.body.acceleration.y = 3000;
        fallFlag = true;
    }
}



var NPCcount = 0;

var cursors;
var platforms;
var textstyle;
var player1;
var fallFlag;
var npcs;
var npc1;
var sum;
var timer; 
var count;
var interactFlag;
var interactText1;
var interactText2;
var interactText3;
var interactSwitch;
var toRemove;
var toRemoves;
var introText;
var anims;
var face = "right";
var textboxs;
var textbox;
var picture;

let game = new Phaser.Game({
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
    scene:{
        preload: preload,
        create: create,
        update: update
    }
});
