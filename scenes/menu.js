export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }

  preload() {
    this.width = this.game.screenBaseSize.width;
    this.height = this.game.screenBaseSize.height;
  }

  create() {
    const background = this.add.image(0, 0, "menu-background").setOrigin(0, 0);
    const logo = this.add.image(this.width / 2, 180, "abismo-logo");
    const playButton = this.add.image(this.width / 2, this.height / 2, "play");
    const creditsButton = this.add.image(
      this.width / 2,
      this.height / 2 + 100,
      "credits"
    );

    logo.setScale(0.4);
    playButton.setScale(0.15);
    creditsButton.setScale(0.15);

    background.setDisplaySize(this.width, this.height);

    playButton.setInteractive();

    playButton.on("pointerdown", () => {
      this.scene.switch("level");
    });

    playButton.on("pointerover", () => {
      playButton.setAlpha(0.5);
    });

    playButton.on("pointerout", () => {
      playButton.setAlpha(1);
    });

    creditsButton.setInteractive();

    creditsButton.on("pointerdown", () => {
      this.scene.switch("credits");
    });

    creditsButton.on("pointerover", () => {
      creditsButton.setAlpha(0.5);
    });

    creditsButton.on("pointerout", () => {
      creditsButton.setAlpha(1);
    });

    this.setCameras();
  }

  setCameras() {
    this.actionCamera = this.cameras.add(0, 0, this.width, this.height);
  }
}
