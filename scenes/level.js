import PlayerSprite from './player-sprite.js';
import { GameOptions } from '../game-options.js';
import { Direction } from '../utils/directions.js';
import { createJellyfishAnims } from '../anims/EnemiesAnims.js';
import Jellyfish from '../enemies/Jellyfish.js';

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'level' });
    }

    preload() {
        this.sceneStopped = false;
        this.width = this.game.screenBaseSize.width;
        this.height = this.game.screenBaseSize.height;
        this.handlerScene = this.scene.get('handler');
        this.handlerScene.sceneRunning = 'level';
    }

    create() {
        createJellyfishAnims(this.anims);

        const { width, height } = this;
        
        this.handlerScene.updateResize(this);

        const map = this.make.tilemap({ key: "map" });

        const tileset = map.addTilesetImage("rock", "rock-tiles");

        this.rightWall = map.createLayer('right_wall', tileset, 310, 1000);
        this.leftWall = map.createLayer('left_wall', tileset, -370, 1000);

        this.rightWall.setScale(.3);
        this.leftWall.setScale(.3);

        this.rightWall.skipCull = true;
        this.leftWall.skipCull = true;

        this.rightWall.setCollisionByProperty({ collides: true });
        this.leftWall.setCollisionByProperty({ collides: true });

        if (this.game.debugMode)
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1);

        this.submarine = new PlayerSprite(this, width / 2, height / 2, 'submarine');

        this.submarine.setScale(.5);

        //this.submarine.body.setAllowGravity(false);

        this.physics.add.collider(this.submarine, this.rightWall);
        this.physics.add.collider(this.submarine, this.leftWall);

        const jellyfishes = this.physics.add.group({
            classType: Jellyfish,
            allowGravity: false,
            createCallback: (go) => {
                go.body.onCollide = true;
            } 
        })

        jellyfishes.get(100, 1000, 'jellyfish');
        jellyfishes.get(150, 1400, 'jellyfish');
        jellyfishes.get(250, 1700, 'jellyfish');

        jellyfishes.get(100, 2000, 'jellyfish');
        jellyfishes.get(150, 2200, 'jellyfish');
        jellyfishes.get(250, 2450, 'jellyfish');
        jellyfishes.get(375, 2673, 'jellyfish');

        jellyfishes.get(350, 2800, 'jellyfish');
        jellyfishes.get(250, 2950, 'jellyfish');
        jellyfishes.get(275, 2300, 'jellyfish');
        jellyfishes.get(375, 2500, 'jellyfish');

        this.physics.add.collider(jellyfishes, this.rightWall);
        this.physics.add.collider(jellyfishes, this.leftWall);

        // const jellyfish = this.physics.add.sprite(100, 2000, 'jellyfish');

        // jellyfish.body.setAllowGravity(false);

        //this.enemy1 = new EnemySprite(this, width / 2, height / 2, 'jellyfish');

        this.setCameras();

        let downX, upX, downY, upY, threshold = 50;

        this.input.on('pointerdown', function (pointer) {
            downX = pointer.x;
            downY = pointer.y;
        });

        this.input.on('pointerup', function (pointer) {
            upX = pointer.x;
            upY = pointer.y;
            console.log(upX, upY);
            if (upX < downX - threshold){
                this.moveSubmarine(Direction.LEFT);
                console.log("swipeleft");
            } else if (upX > downX + threshold) {
                this.moveSubmarine(Direction.RIGHT);
                console.log("swiperight");
            } else if (upY < downY - threshold) {
                this.moveSubmarine(Direction.UP);
                console.log("swipeup");
            } else if (upY > downY + threshold) {
                console.log("swipedown");
            }
        }, this);
    };

    update() {
        //console.log(this.submarine.body.velocity.x);
        //console.log(this.submarine.body.velocity.y);

        if(this.submarine.body.velocity.y > 70) {
            this.submarine.body.velocity.y = 70;
        }

        if(this.submarine.body.velocity.x > 0) {
            this.submarine.body.velocity.x -= .1;
        }
        else if(this.submarine.body.velocity.x < 0) {
            this.submarine.body.velocity.x += .1;
        }
    };

    moveSubmarine(direction) { 
        // set submarine velocity according to input horizontal coordinate
        switch (direction) {
            case Direction.LEFT:
                this.submarine.setVelocityX(GameOptions.acceleration * -1);
                break;     
            case Direction.RIGHT:
                this.submarine.setVelocityX(GameOptions.acceleration);
                break;   
            case Direction.UP:
                this.submarine.setVelocityY(GameOptions.acceleration / 2 * -1);
                break;   
        }
    };

    setCameras() {
        this.actionCamera = this.cameras.add(0, 0, this.width, this.height);
        this.actionCamera.setBackgroundColor('#7DBCDE');

        this.actionCamera.startFollow(this.submarine, true, 0, 0.5, 0, - (this.height / 2 - this.height * GameOptions.position));

        this.cameras.main.ignore([this.submarine, this.rightWall, this.leftWall]);
    };
}