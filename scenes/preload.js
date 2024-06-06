export default class Preload extends Phaser.Scene {
  width = null;
  height = null;
  handlerScene = null;
  sceneStopped = false;

  constructor() {
    super({ key: "preload" });
  }

  preload() {
    this.load.image("guide", "assets/images/540x960-guide.png");
    this.load.image("submarine", "assets/images/submarine.png");
    this.load.image(
      "menu-background",
      "assets/images/deepsea-background-2.jpg"
    );
    this.load.image("abismo-logo", "assets/images/abismo-logo.png");
    this.load.image("play", "assets/images/play.png");
    this.load.image("credits", "assets/images/credits.png");
    this.load.tilemapTiledJSON("map", "assets/tiles/map.json");
    this.load.image("rock-tiles", "assets/tiles/rock-tiles.png");
    this.load.spritesheet("jellyfish-idle", "assets/tiles/Fishes/1/Idle.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("jellyfish-walk", "assets/tiles/Fishes/1/Walk.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("eel-attack", "assets/tiles/Fishes/5/Attack.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("eel-walk", "assets/tiles/Fishes/5/Walk.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.image("ui-empty-heart", "assets/images/ui/ui_heart_empty.png");
    this.load.image("ui-full-heart", "assets/images/ui/ui_heart_full.png");

    this.canvasWidth = this.sys.game.canvas.width;
    this.canvasHeight = this.sys.game.canvas.height;

    this.width = this.game.screenBaseSize.width;
    this.height = this.game.screenBaseSize.height;

    this.handlerScene = this.scene.get("handler");
    this.handlerScene.sceneRunning = "preload";
    this.sceneStopped = false;

    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x000, 0.8);
    progressBox.fillRect(
      this.canvasWidth / 2 - 210 / 2,
      this.canvasHeight / 2 - 5,
      210,
      30
    );
    let progressBar = this.add.graphics();

    this.load.on("progress", (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xff5758, 1);
      progressBar.fillRect(
        this.canvasWidth / 2 - 200 / 2,
        this.canvasHeight / 2,
        200 * value,
        20
      );
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      this.time.addEvent({
        delay: this.game.debugMode ? 3000 : 4000,
        callback: () => {
          this.sceneStopped = true;
          this.scene.stop("preload");
          this.handlerScene.cameras.main.setBackgroundColor("#000000");
          this.handlerScene.launchScene("menu");
        },
        loop: false,
      });
    });
  }

  create() {
    this.handlerScene.updateResize(this);
    if (this.game.debugMode)
      this.add.image(0, 0, "guide").setOrigin(0).setDepth(1);
  }
}
