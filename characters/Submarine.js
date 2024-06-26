import { GameOptions } from "../game-options.js";
import { Direction } from "../utils/directions.js";
import { sceneEvents } from "../events/EventsCenter.js";

const HealthState = {
  IDLE: 0,
  DAMAGE: 1,
  DEAD: 2,
};

export default class Submarine extends Phaser.Physics.Arcade.Sprite {
  direction = Direction.DOWN;
  healthState = HealthState.IDLE;
  damageTime = 0;
  _health = 5;

  health = () => {
    return this._health;
  };

  constructor(scene, x, y) {
    super(scene, x, y, "submarine");

    this.setScale(0.2);

    this.initInputs(scene);
  }

  handleDamage(dir) {
    if (this._health <= 0) {
      return;
    }

    if (
      this.healthState === HealthState.DAMAGE ||
      this.healthState === HealthState.DEAD
    ) {
      return;
    }

    this.setVelocity(dir.x, dir.y);

    // Set red
    this.setTint(0xff0000);

    this.healthState = HealthState.DAMAGE;

    this.direction = Direction.DOWN;

    this.damageTime = 0;
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    if (this.healthState === HealthState.DEAD) {
      return;
    }

    switch (this.healthState) {
      case HealthState.IDLE:
        break;
      case HealthState.DAMAGE:
        this.damageTime += dt;

        if (this.damageTime >= 1000) {
          this.healthState = HealthState.IDLE;
          this.setTint(0xffffff);
          this.damageTime = 0;

          --this._health;

          if (this._health <= 0) {
            this.healthState = HealthState.DEAD;
            sceneEvents.emit("player-dead");
          }

          sceneEvents.emit("player-health-changed", this.health);
        }

        break;
    }

    if (this.healthState === HealthState.DAMAGE) {
      return;
    }

    switch (this.direction) {
      case Direction.LEFT:
        this.setVelocityX(GameOptions.acceleration * -1);
        break;
      case Direction.RIGHT:
        this.setVelocityX(GameOptions.acceleration);
        break;
      case Direction.UP:
        this.setVelocityY((GameOptions.acceleration / 2) * -1);
        break;
    }
  }

  initInputs(scene) {
    let downX,
      upX,
      downY,
      upY,
      threshold = 50;

    const moveSubmarine = (direction) => (this.direction = direction);

    scene.input.on("pointerdown", function (pointer) {
      downX = pointer.x;
      downY = pointer.y;
    });

    scene.input.on(
      "pointerup",
      function (pointer) {
        upX = pointer.x;
        upY = pointer.y;

        if (upX < downX - threshold) {
          moveSubmarine(Direction.LEFT);
          console.log("swipeleft");
        } else if (upX > downX + threshold) {
          moveSubmarine(Direction.RIGHT);
          console.log("swiperight");
        } else if (upY < downY - threshold) {
          moveSubmarine(Direction.UP);
          console.log("swipeup");
        } else if (upY > downY + threshold) {
          moveSubmarine(Direction.DOWN);
          console.log("swipedown");
        }
      },
      scene
    );
  }
}

Phaser.GameObjects.GameObjectFactory.register("submarine", function (x, y) {
  const submarine = new Submarine(this.scene, x, y);

  this.displayList.add(submarine);
  this.updateList.add(submarine);

  this.scene.physics.world.enableBody(
    submarine,
    Phaser.Physics.Arcade.DYNAMIC_BODY
  );

  submarine.body.setSize(submarine.width * 0.3, submarine.height * 0.8, true);
  //submarine.body.setAllowGravity(false);

  return submarine;
});
