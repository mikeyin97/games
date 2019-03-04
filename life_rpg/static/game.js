
function preload(){
    this.load.image('sprite', 'sprite.png');
    this.load.image('ammo', 'ammo.png');
    this.load.image('sky', 'sky.png');
    this.load.image('background', 'background1.png');
    this.load.image('ground', 'bottom.png');
    this.load.image('dirt2', 'nograssground.png');
    this.load.image('platform', 'platforms.png');
    this.load.image('shot', 'shot.png');
    this.load.image('dirt', 'bigground.png');
    this.load.image('textbox', 'textbox.png');
    this.load.image('tree', 'tree.png');
    this.load.image('tree2', 'tree2.png');
    this.load.image('sign', 'sign.png');
    this.load.image('stair1', 'stair1.png');
    this.load.image('stair2', 'stair2.png');
    this.load.image('room1', 'room1.png');
    this.load.image('plant', 'plant.png');
    this.load.image('seperator', 'roomseperator.png');
    this.load.spritesheet('player', 'bigguy.png', { frameWidth: 54, frameHeight: 80 });
}

function create(){
        
    

    count = 0
    interactFlag = false;
    interactSwitch = false;
    this.add.image(1500, -10, 'background');
    cursors = this.input.keyboard.createCursorKeys();
    interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    decorations = this.physics.add.staticGroup();
    tree1 = decorations.create(-60, 300, 'tree');
    tree2 = decorations.create(800, 300, 'tree2');
    tree3 = decorations.create(1200, 300, 'tree');
    tree2 = decorations.create(1600, 300, 'tree2');
    sign = decorations.create(150, 430, 'sign');
    platforms = this.physics.add.staticGroup();
    platforms.create(-200, 1150, 'dirt');
    platforms.create(100, 1150, 'dirt');
    platforms.create(400, 1150, 'dirt');
    platforms.create(700, 1150, 'dirt');
    platforms.create(1000, 1150, 'dirt');
    platforms.create(1300, 1150, 'dirt');
    platforms.create(1600, 1150, 'dirt');
    platforms.create(1900, 1150, 'dirt');
    platforms.create(2100, 1150, 'dirt');
    platforms.create(2450, 1150, 'dirt2');
    platforms.create(2548, 1110, 'dirt2');

    platforms.create(2073, 473, 'stair1');
    platforms.create(2120, 465, 'stair2');

    rooms = this.physics.add.staticGroup();
    rooms.create(2380, 318, 'room1');

    textboxs = this.physics.add.staticGroup();
    textbox = textboxs.create(670, 750, 'textbox');
    textbox.setScrollFactor(0);
    textbox.visible = false;
    textbox.alpha = 0.8;

    
    
    

    roomseperator1 = decorations.create(2270, 414, 'plant');
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

    npcs = this.physics.add.group();
    npc1 = npcs.create(800, 450, 'sprite');
    npc1.setBounce(0);
    npc1.setCollideWorldBounds(false);
    npc1.body.setGravityY(300);
    npc1.setTint(0x00ff00);
    npc1.text = "go away"
    npc1.name = "npc"

    npc2 = npcs.create(2600, 410, 'sprite');
    npc2.setBounce(0);
    npc2.setCollideWorldBounds(false);
    npc2.body.setGravityY(300);
    npc2.setTint(0x00ff00);
    npc2.text = "hey"
    npc2.name = "npc2"

    indicators = this.physics.add.group();

    npc1indicator = indicators.create(npc1.x, npc1.y - 40, 'ammo');
    npc1indicator.setGravityY(-300);
    npc1indicator.setTint(0xff0000);

    npc2indicator = indicators.create(npc2.x, npc2.y - 40, 'ammo');
    npc2indicator.setGravityY(-300);
    npc2indicator.setTint(0xff0000);

    npc1.profile = textboxs.create(100, 760, 'player');
    npc1.profile.setScrollFactor(0);
    npc1.profile.visible = false;

    npc2.profile = textboxs.create(100, 760, 'player');
    npc2.profile.setScrollFactor(0);
    npc2.profile.visible = false;
    //npc1.setVelocityX(-100);

    timer = this.time.addEvent({
        delay: 2000,                // ms
        callback: moveNPC,
        args: [npc1, npc1indicator],
        loop: true
    });

    timer = this.time.addEvent({
        delay: 2000,                // ms
        callback: moveNPC2,
        args: [npc2, npc2indicator],
        loop: true
    });

    //player1 = this.physics.add.sprite(400, 300, 'player');
    player1 = this.physics.add.sprite(1800, 300, 'player');
    player1.setBounce(0);
    player1.setCollideWorldBounds(false);
    player1.body.setGravityY(300);


    plant = decorations.create(2270, 414, 'plant');
    sep1 = decorations.create(2140, 318, 'seperator');
    sep2 = decorations.create(2620, 318, 'seperator');

    interactText1 = this.add.text(250, 700, '', textstyle2);
    interactText2 = this.add.text(250, 745, '', textstyle);
    interactText3 = this.add.text(250, 775, '', textstyle);
    this.cameras.main.startFollow(player1);
    this.cameras.main.setFollowOffset(0, 100);
    
    interactText1.setScrollFactor(0);
    interactText2.setScrollFactor(0);
    interactText3.setScrollFactor(0);
    this.physics.add.collider(npcs, platforms);
    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player1, tree1);
}

function moveNPC(obj, ind){
    if (NPCcount1 == 0){
        obj.setVelocityX(-50);
        ind.setVelocityX(-50);
    } else if (NPCcount1 == 1){
        obj.setVelocityX(-50);
        ind.setVelocityX(-50);
    } else if (NPCcount1 == 2){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount1 == 3){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount1 == 4){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount1 == 5){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount1 == 6){
        obj.setVelocityX(50);
        ind.setVelocityX(50);
    } else if (NPCcount1 == 7){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount1 == 8){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount1 == 9){
        obj.setVelocityX(50);
        ind.setVelocityX(50);
    } else if (NPCcount1 == 10){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount1 == 11){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount1 == 12){
        obj.setVelocityX(50);
        ind.setVelocityX(50);
    } else if (NPCcount1 == 13){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount1 == 14){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount1 == 15){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount1 == 16){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount1 == 17){
        obj.setVelocityX(-50);
        ind.setVelocityX(-50);
    } else if (NPCcount1 == 18){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    }
    
    if (NPCcount1 == 18){
        NPCcount1 = -1
    }
    NPCcount1 += 1;
}

function moveNPC2(obj, ind){
    if (NPCcount2 == 0){
        obj.setVelocityX(-50);
        ind.setVelocityX(-50);
    } else if (NPCcount2 == 1){
        obj.setVelocityX(-50);
        ind.setVelocityX(-50);
    } else if (NPCcount2 == 2){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount2 == 3){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount2 == 4){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount2 == 5){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount2 == 6){
        obj.setVelocityX(50);
        ind.setVelocityX(50);
    } else if (NPCcount2 == 7){
        obj.setVelocityX(50);
        ind.setVelocityX(50);
    } else if (NPCcount2 == 8){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount2 == 9){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount2 == 10){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount2 == 11){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount2 == 12){
        obj.setVelocityX(50);
        ind.setVelocityX(50);
    } else if (NPCcount2 == 13){
        obj.setVelocityX(50);
        ind.setVelocityX(50);
    } else if (NPCcount2 == 14){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount2 == 15){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    } else if (NPCcount2 == 16){
        obj.setVelocityX(-50);
        ind.setVelocityX(-50);
    } else if (NPCcount2 == 17){
        obj.setVelocityX(-50);
        ind.setVelocityX(-50);
    } else if (NPCcount2 == 18){
        obj.setVelocityX(0);
        ind.setVelocityX(0);
    }
    
    if (NPCcount2 == 18){
        NPCcount2 = -1
    }
    NPCcount2 += 1
}
function remove(obj){
    //obj.disableBody(true, true);
    fadeOutDestroy(obj, 100);
}

function update(){
    //NPC 1 only
    npcs.children.iterate(function (child) {
        if (!interactFlag & player1.body.touching.down & player1.x > child.x-30 & player1.x < child.x+30 & interactKey.isDown){
            if (!interactSwitch){
                interactSwitch = true;
                interactFlag = true;
                textbox.visible = true;
                interactText1.setText(child.name);
                interactText2.setText(child.text);
                child.profile.visible = true;
                interacted = child;
            }
        }
        if (interactKey.isUp) {
            interactSwitch = false
        }
    
        if (interactFlag & interactKey.isDown){
            console.log("HI")
            if (!interactSwitch){
                interactSwitch = true;
                interactFlag = false;
                textbox.visible = false;
                interactText1.setText("");
                interactText2.setText("");
                interactText3.setText("");
                interacted.profile.visible = false;
            }
        }
    });

    

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



var NPCcount1 = 0;
var NPCcount2 = 0;

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
var interacted;
let game = new Phaser.Game({
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
    scene:{
        preload: preload,
        create: create,
        update: update
    }
});

