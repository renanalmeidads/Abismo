export class Text extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text) {
    super(scene, x, y, text, {
      fontSize: "calc(100vw / 100)",
      color: "#fff",
      stroke: "#000",
      strokeThickness: 4,
    });

    scene.add.existing(this);
  }
}
