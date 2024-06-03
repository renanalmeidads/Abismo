const createJellyfishAnims = (anims) => {
  anims.create({
    key: "jellyfish-idle",
    frames: anims.generateFrameNumbers("jellyfish-idle", { start: 0, end: 3 }),
    frameRate: 6,
    repeat: -1,
  });

  anims.create({
    key: "jellyfish-walk",
    frames: anims.generateFrameNumbers("jellyfish-walk", { start: 0, end: 3 }),
    frameRate: 6,
    repeat: -1,
  });
  anims.create({
    key: "eel-attack",
    frames: anims.generateFrameNumbers("eel-attack", { start: 0, end: 3 }),
    frameRate: 6,
    repeat: -1,
  });

  anims.create({
    key: "eel-walk",
    frames: anims.generateFrameNumbers("eel-walk", { start: 0, end: 3 }),
    frameRate: 6,
    repeat: -1,
  });
};

export { createJellyfishAnims };
