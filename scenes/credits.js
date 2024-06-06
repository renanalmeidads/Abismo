import { Text } from "../common/text.js";

export default class Credits extends Phaser.Scene {
  constructor() {
    super({ key: "credits" });
  }

  preload() {
    this.width = this.game.screenBaseSize.width;
    this.height = this.game.screenBaseSize.height;
  }

  create() {
    const background = this.add.image(0, 0, "menu-background").setOrigin(0, 0);
    const logo = this.add.image(this.width / 2, 180, "abismo-logo");
    const quitButton = this.add.image(this.width / 2, 650, "quit");

    logo.setScale(0.4);

    background.setDisplaySize(this.width, this.height);

    this.add.text(
      this.width / 3.5,
      this.height / 2,
      "Feito por - Renan Almeida",
      {
        fontFamily: "Arial",
        fontSize: "20px",
        color: "#fff",
        stroke: "#000",
        strokeThickness: 4,
      }
    );

    quitButton.setInteractive();

    quitButton.on("pointerdown", () => {
      this.scene.switch("menu");
    });

    quitButton.on("pointerover", () => {
      quitButton.setAlpha(0.5);
    });

    quitButton.on("pointerout", () => {
      quitButton.setAlpha(1);
    });

    this.setCameras();
  }

  setCameras() {
    this.actionCamera = this.cameras.add(0, 0, this.width, this.height);
  }
}
