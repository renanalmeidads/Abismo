import PlayerSprite from "./player-sprite.js";
import { GameOptions } from "../game-options.js";
import { Direction } from "../utils/directions.js";
import { createJellyfishAnims } from "../anims/EnemiesAnims.js";
import Jellyfish from "../enemies/Jellyfish.js";
import Submarine from "../characters/Submarine.js";
import { sceneEvents } from "../events/EventsCenter.js";
import Eel from "../enemies/Eel.js";
import { ScoreOperations } from "../common/score.js";
import Octopus from "../enemies/Octopus.js";
import Swordfish from "../enemies/Swordfish.js";
import Anglerfish from "../enemies/Anglerfish.js";

export default class Level extends Phaser.Scene {
  scoreAccumulator = 0;

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
    const yOffset = 3500;

    this.scene.run("game-ui");

    createJellyfishAnims(this.anims);

    const { width, height } = this;

    this.handlerScene.updateResize(this);

    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("rock", "rock-tiles");

    this.rightWall = map.createLayer("right_wall", tileset, 0, 850);
    this.leftWall = map.createLayer("left_wall", tileset, -580, 50);

    this.rightWall.setScale(0.3);
    this.leftWall.setScale(0.3);

    this.rightWall.skipCull = true;
    this.leftWall.skipCull = true;

    this.rightWall.setCollisionByProperty({ collides: true });
    this.leftWall.setCollisionByProperty({ collides: true });

    if (this.game.debugMode)
      this.add.image(0, 0, "guide").setOrigin(0).setDepth(1);

    this.submarine = this.add.submarine(width / 2, yOffset);

    //this.submarine = this.add.submarine(width / 2, 2500);

    // Bottom
    //this.submarine = this.add.submarine(width / 2, 15400);

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

    const eels = this.physics.add.group({
      classType: Eel,
      allowGravity: false,
      createCallback: (go) => {
        go.body.onCollide = true;
      },
    });

    const octopuses = this.physics.add.group({
      classType: Octopus,
      allowGravity: false,
      createCallback: (go) => {
        go.body.onCollide = true;
      },
    });

    const swordfishes = this.physics.add.group({
      classType: Swordfish,
      allowGravity: false,
      createCallback: (go) => {
        go.body.onCollide = true;
      },
    });

    const anglerfishes = this.physics.add.group({
      classType: Anglerfish,
      allowGravity: false,
      createCallback: (go) => {
        go.body.onCollide = true;
      },
    });

    //anglerfishes.get(100, 1000, "anglerfish");
    jellyfishes.get(300, yOffset + 400, "jellyfish");
    jellyfishes.get(50, yOffset + 500, "jellyfish");
    jellyfishes.get(100, yOffset + 800, "jellyfish");
    jellyfishes.get(250, yOffset + 1000, "jellyfish");

    eels.get(350, yOffset + 1200, "eel");

    jellyfishes.get(450, yOffset + 1350, "jellyfish");

    eels.get(450, yOffset + 1700, "eel");

    eels.get(450, yOffset + 2000, "eel");

    swordfishes.get(150, yOffset + 2400, "swordfish");

    swordfishes.get(250, yOffset + 2900, "swordfish");

    swordfishes.get(50, yOffset + 3200, "swordfish");

    octopuses.get(50, yOffset + 3000, "octopus");

    swordfishes.get(20, yOffset + 3500, "swordfish");

    swordfishes.get(400, yOffset + 4500, "swordfish");

    swordfishes.get(270, yOffset + 5000, "swordfish");

    octopuses.get(300, yOffset + 6000, "octopus");

    octopuses.get(300, yOffset + 7000, "octopus");

    octopuses.get(300, yOffset + 7500, "octopus");

    anglerfishes.get(100, yOffset + 8500, "anglerfish");
    anglerfishes.get(100, yOffset + 8900, "anglerfish");
    anglerfishes.get(100, yOffset + 9500, "anglerfish");

    anglerfishes.get(100, yOffset + 14500, "anglerfish");
    anglerfishes.get(100, yOffset + 14500, "anglerfish");
    anglerfishes.get(100, yOffset + 14500, "anglerfish");
    anglerfishes.get(100, yOffset + 14500, "anglerfish");
    anglerfishes.get(100, yOffset + 14500, "anglerfish");
    anglerfishes.get(100, yOffset + 14500, "anglerfish");
    anglerfishes.get(100, yOffset + 14500, "anglerfish");
    anglerfishes.get(100, yOffset + 14500, "anglerfish");

    this.physics.add.collider(jellyfishes, this.rightWall);
    this.physics.add.collider(jellyfishes, this.leftWall);

    this.physics.add.collider(eels, this.rightWall);
    this.physics.add.collider(eels, this.leftWall);

    this.physics.add.collider(octopuses, this.rightWall);
    this.physics.add.collider(octopuses, this.leftWall);

    this.physics.add.collider(swordfishes, this.rightWall);
    this.physics.add.collider(swordfishes, this.leftWall);

    this.physics.add.collider(anglerfishes, this.rightWall);
    this.physics.add.collider(anglerfishes, this.leftWall);

    this.physics.add.collider(
      jellyfishes,
      this.submarine,
      this.handleSubmarineJellyfishesCollision,
      undefined,
      this
    );

    this.physics.add.collider(
      eels,
      this.submarine,
      this.handleSubmarineEelsCollision,
      undefined,
      this
    );

    this.physics.add.collider(
      octopuses,
      this.submarine,
      this.handleSubmarineEelsCollision,
      undefined,
      this
    );

    this.physics.add.collider(
      swordfishes,
      this.submarine,
      this.handleSubmarineEelsCollision,
      undefined,
      this
    );

    this.physics.add.collider(
      anglerfishes,
      this.submarine,
      this.handleSubmarineEelsCollision,
      undefined,
      this
    );

    this.setCameras();

    sceneEvents.on("player-dead", this.reset, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off("player-dead", this.reset, this);
    });
  }

  handleSubmarineEelsCollision = (obj1, obj2) => {
    const dx = this.submarine.x - obj2.x;
    const dy = this.submarine.y - obj2.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(75);

    this.submarine.handleDamage(dir);
  };

  handleSubmarineJellyfishesCollision = (obj1, obj2) => {
    const dx = this.submarine.x - obj2.x;
    const dy = this.submarine.y - obj2.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(50);

    this.submarine.handleDamage(dir);
  };

  handleSubmarineWallCollision = (obj1, obj2) => {
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

    if (this.submarine.body.velocity.y > 5) {
      this.scoreAccumulator++;

      if (this.scoreAccumulator > 7) {
        sceneEvents.emit("increase-score", {
          operation: ScoreOperations.INCREASE,
          value: 1,
        });

        this.scoreAccumulator = 0;
      }
    }
  }

  setCameras() {
    this.actionCamera = this.cameras.add(0, 0, this.width, this.height);
    this.actionCamera.setBackgroundColor("#003366");

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

  reset() {
    this.scene.restart();
  }
}
