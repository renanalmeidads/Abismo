import { sceneEvents } from "../events/EventsCenter.js";
import { Score, ScoreOperations } from "../common/score.js";

export default class GameUI extends Phaser.Scene {
  hearts;
  score;

  constructor() {
    super({ key: "game-ui" });
  }

  preload() {
    this.width = this.game.screenBaseSize.width;

    this.score = new Score(this, this.width - 150, 0, 0);
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
      if (idx < health()) {
        go.setTexture("ui-full-heart");
      } else {
        go.setTexture("ui-empty-heart");
      }
    });
  }
}
