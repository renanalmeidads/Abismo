import { Direction, randomDirection } from "../utils/directions.js";

export default class Eel extends Phaser.Physics.Arcade.Sprite {
  direction = Direction.RIGHT;
  moveEvent;

  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.anims.play("eel-walk");

    this.setScale(1.4);

    scene.physics.world.on(
      Phaser.Physics.Arcade.Events.TILE_COLLIDE,
      this.handleTileCollision,
      this
    );

    this.moveEvent = scene.time.addEvent({
      delay: 3000,
      callback: () => {
        this.direction = randomDirection();
      },
      loop: true,
    });

    this.attackEvent = scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.anims.play("eel-attack");
      },
      loop: true,
    });

    this.attackEvent = scene.time.addEvent({
      delay: 3000,
      callback: () => {
        this.anims.play("eel-walk");
      },
      loop: true,
    });
  }

  destroy(fromScene) {
    this.moveEvent.destroy();

    super.destroy(fromScene);
  }

  handleTileCollision(go, tile) {
    if (go !== this) {
      return;
    }

    this.direction = randomDirection(this.direction);
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    const speed = 50;

    switch (this.direction) {
      case Direction.UP:
        break;
      case Direction.DOWN:
        break;
      case Direction.RIGHT:
        this.setVelocity(speed, 0);
        this.flipX = false;
        break;
      case Direction.LEFT:
        this.setVelocity(-speed, 0);
        this.flipX = true;
        break;
      case Direction.NONE:
        this.setVelocity(0, 0);
    }
  }
}
