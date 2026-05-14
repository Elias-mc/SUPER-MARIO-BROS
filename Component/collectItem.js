export function collectItem(mario, item, game) {
  const {
    texture: { key },
  } = item;

  if (key === "coin") {
    playSound("coin-pickup", this); //importamos el sonido de la moneda
    item.destroy();
    addToScore(100, item, this);
  } else if (key === "mushroom") {
    item.destroy();
    this.physics.world.pause();
    this.anims.pauseAll();

    let i = 0;

    const interval = setInterval(() => {
      mario.anims.play(i % 2 === 0 ? "mario-grown-idle" : "mario-idle");
      i++;
    }, 100);

    mario.isBlocked = true;
    playSound("powerup", this);

    setTimeout(() => {
      mario.isGrown = true;
      mario.setDisplaySize(18, 32);
      mario.body.setSize(18, 32);

      this.anims.resumeAll();
      mario.isBlocked = false;
      clearInterval(interval);
      this.physics.world.resume();
    }, 1000);
  }
}
