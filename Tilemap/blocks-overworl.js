export function blocksOverworld(game, height) {
  game.blocks = game.physics.add.staticGroup();

  game.blocks
    .create(100, height - 100, "misteryBlock")
    .anims.play("misteryBlock-idle", true);

  game.blocks.create(115, height - 100, "emptyBlock");

  game.blocks
    .create(370, height - 100, "misteryBlock")
    .anims.play("misteryBlock-idle", true);

  game.blocks.create(470, height - 100, "block");

  game.blocks
    .create(486, height - 100, "misteryBlock-mushroom")
    .anims.play("misteryBlock-idle-mushroom", true);

  game.blocks.create(502, height - 100, "block");
  game.blocks
    .create(502, height - 170, "misteryBlock")
    .anims.play("misteryBlock-idle", true);

  game.blocks
    .create(518, height - 100, "misteryBlock")
    .anims.play("misteryBlock-idle", true);

  game.blocks.create(534, height - 100, "block");

  game.blocks.create(650, height - 48, "vertical-small-tube");

  game.blocks.create(820, height - 56, "vertical-medium-tube");
}
