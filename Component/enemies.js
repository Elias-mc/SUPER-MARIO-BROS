export function enemies(game, height) {
  game.enemies = game.physics.add.group();

  game.enemies
    .create(512, height - 30, "goomba")
    .setOrigin(0, 1)
    .setGravityY(300)
    .setVelocityX(-50);

  game.enemies
    .create(800, height - 30, "goomba")
    .setOrigin(0, 1)
    .setGravityY(300)
    .setVelocityX(-50);
}
