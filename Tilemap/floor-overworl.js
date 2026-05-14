export function floorOverworld(game, height) {
  game.floor = game.physics.add.staticGroup();

  const blockWidth = 128;
  const amount = 20;

  for (let i = 0; i < amount; i++) {
    game.floor
      .create(i * blockWidth, height - 16, "floorbricks")
      .setOrigin(0, 0.5)
      .refreshBody();
  }
}
