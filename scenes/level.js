import PlayerSprite from "./player-sprite.js";
import { GameOptions } from "../game-options.js";
import { Direction } from "../utils/directions.js";
import { createJellyfishAnims } from "../anims/EnemiesAnims.js";
import Jellyfish from "../enemies/Jellyfish.js";
import Submarine from "../characters/Submarine.js";

export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: "level" });

    this.light = null;
  }

  preload() {
    this.sceneStopped = false;
    this.width = this.game.screenBaseSize.width;
    this.height = this.game.screenBaseSize.height;
    this.handlerScene = this.scene.get("handler");
    this.handlerScene.sceneRunning = "level";
  }

  create() {
    this.scene.run("game-ui");

    createJellyfishAnims(this.anims);

    const { width, height } = this;

    this.handlerScene.updateResize(this);

    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("rock", "rock-tiles");

    this.rightWall = map.createLayer("right_wall", tileset, 310, 1000);
    this.leftWall = map.createLayer("left_wall", tileset, -370, 1000);

    this.rightWall.setScale(0.3);
    this.leftWall.setScale(0.3);

    this.rightWall.skipCull = true;
    this.leftWall.skipCull = true;

    this.rightWall.setCollisionByProperty({ collides: true });
    this.leftWall.setCollisionByProperty({ collides: true });

    if (this.game.debugMode)
      this.add.image(0, 0, "guide").setOrigin(0).setDepth(1);

    this.submarine = this.add.submarine(width / 2, height / 2);

    this.physics.add.collider(
      this.submarine,
      this.rightWall,
      this.handleSubmarineWallCollision,
      undefined,
      this
    );
    this.physics.add.collider(
      this.submarine,
      this.leftWall,
      this.handleSubmarineWallCollision,
      undefined,
      this
    );

    const jellyfishes = this.physics.add.group({
      classType: Jellyfish,
      allowGravity: false,
      createCallback: (go) => {
        go.body.onCollide = true;
        go.body.setSize(10, 15);
      },
    });

    jellyfishes.get(100, 1000, "jellyfish");
    jellyfishes.get(150, 1400, "jellyfish");
    jellyfishes.get(250, 1700, "jellyfish");

    jellyfishes.get(100, 2000, "jellyfish");
    jellyfishes.get(150, 2200, "jellyfish");
    jellyfishes.get(250, 2450, "jellyfish");
    jellyfishes.get(375, 2673, "jellyfish");

    jellyfishes.get(350, 2800, "jellyfish");
    jellyfishes.get(250, 2950, "jellyfish");
    jellyfishes.get(275, 2300, "jellyfish");
    jellyfishes.get(375, 2500, "jellyfish");

    this.physics.add.collider(jellyfishes, this.rightWall);
    this.physics.add.collider(jellyfishes, this.leftWall);

    this.physics.add.collider(
      jellyfishes,
      this.submarine,
      this.handleSubmarineJellyfishesCollision,
      undefined,
      this
    );

    this.setCameras();
  }

  handleSubmarineJellyfishesCollision = (obj1, obj2) => {
    console.dir(obj1);
    console.dir(obj2);

    const dx = this.submarine.x - obj2.x;
    const dy = this.submarine.y - obj2.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(50);

    this.submarine.handleDamage(dir);
  };

  handleSubmarineWallCollision = (obj1, obj2) => {
    console.dir(obj1);
    console.dir(obj2);

    const dx = obj2.x - this.submarine.x;
    const dy = obj2.y - this.submarine.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(100);

    this.submarine.handleDamage(dir);
  };

  update() {
    if (this.submarine) {
      if (this.submarine.body.velocity.y > 70) {
        this.submarine.body.velocity.y = 70;
      }

      if (this.submarine.body.velocity.x > 0) {
        this.submarine.body.velocity.x -= 0.1;
      } else if (this.submarine.body.velocity.x < 0) {
        this.submarine.body.velocity.x += 0.1;
      }
    }
  }

  setCameras() {
    this.actionCamera = this.cameras.add(0, 0, this.width, this.height);
    this.actionCamera.setBackgroundColor("#7DBCDE");

    this.actionCamera.startFollow(
      this.submarine,
      true,
      0,
      0.5,
      0,
      -(this.height / 2 - this.height * GameOptions.position)
    );

    this.cameras.main.ignore([this.submarine, this.rightWall, this.leftWall]);
  }
}
