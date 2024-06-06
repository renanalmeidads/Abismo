import { Text } from "./text.js";
import { sceneEvents } from "../events/EventsCenter.js";

export const ScoreOperations = {
  INCREASE: 0,
  DECREASE: 1,
  SET_VALUE: 2,
};

export class Score extends Text {
  scoreValue;

  constructor(scene, x, y, initScore) {
    super(scene, x, y, `Score: ${initScore} m`);
    scene.add.existing(this);
    this.scoreValue = initScore;

    sceneEvents.on("increase-score", this.changeValue, this);

    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off("increase-score", this.changeValue, this);
    });
  }

  changeValue({ operation, value }) {
    switch (operation) {
      case ScoreOperations.INCREASE:
        this.scoreValue += value;
        break;
      case ScoreOperations.DECREASE:
        this.scoreValue -= value;
        break;
      case ScoreOperations.SET_VALUE:
        this.scoreValue = value;
        break;
      default:
        break;
    }

    this.setText(`Score: ${this.scoreValue} m`);
  }

  getValue() {
    return this.scoreValue;
  }
}
