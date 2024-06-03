const createJellyfishAnims = (anims) => {
  anims.create({
    key: "idle",
    frames: anims.generateFrameNumbers("jellyfish-idle", { start: 0, end: 3 }),
    frameRate: 6,
    repeat: -1,
  });

  anims.create({
    key: "walk",
    frames: anims.generateFrameNumbers("jellyfish-walk", { start: 0, end: 3 }),
    frameRate: 6,
    repeat: -1,
  });
};

export { createJellyfishAnims };
