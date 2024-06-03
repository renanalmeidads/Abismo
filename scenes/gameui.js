import { sceneEvents } from "../events/EventsCenter.js";

export default class GameUI extends Phaser.Scene {
  hearts;

  constructor() {
    super({ key: "game-ui" });
  }

  create() {
    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image,
    });

    this.hearts.createMultiple({
      key: "ui-full-heart",
      setXY: {
        x: 10,
        y: 10,
        stepX: 16,
      },
      quantity: 5,
    });

    sceneEvents.on(
      "player-health-changed",
      this.handlePlayerHealthChanged,
      this
    );

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off(
        "player-health-changed",
        this.handlePlayerHealthChanged,
        this
      );
    });
  }

  handlePlayerHealthChanged(health) {
    this.hearts.children.each((go, idx) => {
      console.log("idx", idx);
      console.log("health", health());
      if (idx < health()) {
        go.setTexture("ui-full-heart");
      } else {
        go.setTexture("ui-empty-heart");
      }
    });
  }
}
