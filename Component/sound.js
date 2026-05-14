const INIT_AUDIO = [
  {
    key: "gameover",
    path: "assets/sound/music/gameover.mp3",
  },
  {
    key: "jump",
    path: "assets/sound/effects/jump.mp3",
  },
  {
    key: "overworld",
    path: "assets/sound/music/overworld/theme.mp3",
  },
  {
    key: "stomp",
    path: "assets/sound/effects/goomba-stomp.wav",
  },
  {
    key: "coin-pickup",
    path: "assets/sound/effects/coin.mp3",
  },
  {
    key: "powerup",
    path: "assets/sound/effects/consume-powerup.mp3",
  },
  {
    key: "powerdown",
    path: "assets/sound/effects/powerdown.mp3",
  },
];

export const Audio = ({ load }) => {
  INIT_AUDIO.forEach(({ key, path }) => {
    load.audio(key, path);
  });
};

export const playSound = (id, { sound }, { volume = 0.1 } = {}) => {
  try {
    return sound.add(id, { volume }).play();
  } catch (e) {
    console.error(e);
  }
};
