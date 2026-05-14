// Global Phaser configuration

import { createAnimations } from "./animations.js";
import { checkControls } from "./Component/controls.js";
import { imageSprite } from "./Component/imageSprite.js";
import { Audio } from "./Component/sound.js";
import { playSound } from "./Component/sound.js";
import { SpriteSheet } from "./Component/sprintesheet.js";
import { overworldbg } from "./Tilemap/overworldbg.js";
import { floorOverworld } from "./Tilemap/floor-overworl.js";
import { blocksOverworld } from "./Tilemap/blocks-overworl.js";
import { enemies } from "./Component/enemies.js";

const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 244,
  backgroundColor: "#5c94fc",
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload, //se ejecuta pra precargar recursos
    create, //se ejecuta cuando el juego comineza
    update, //se ejecuta en cada frame del juego
  },
};

new Phaser.Game(config);

function preload() {
  imageSprite(this); //importamos los sprites del bg

  SpriteSheet(this); //importamos las hojas de sprites

  Audio(this); //importamos el audio
} //1.

function create() {
  // imagen(x, y, id)

  createAnimations(this); //importamos las animaciones

  overworldbg(this); //importamos le bg de el overworld

  floorOverworld(this, config.height); //importamos el suelo del overWorld

  this.mario = this.physics.add
    .sprite(50, 100, "mario")
    .setOrigin(0, 1)
    .setGravityY(300)
    .setCollideWorldBounds(true);

  enemies(this, config.height);

  blocksOverworld(this, config.height);

  this.collectibes = this.physics.add.staticGroup();

  this.collectibes
    .create(200, config.height - 100, "coin")
    .anims.play("coin-idle", true);

  this.collectibes_no_static = this.physics.add.group();
  this.collectibes_no_static
    .create(200, config.height - 40, "mushroom")
    .setVelocityX(-50)
    .setGravityY(300);

  this.physics.add.overlap(
    this.mario,
    this.collectibes,
    collectItem,
    null,
    this,
  );

  this.ph;

  this.physics.add.collider(this.collectibes_no_static, this.floor);

  this.physics.add.collider(
    this.collectibes_no_static,
    this.blocks,
    collectObject,
    null,
    this,
  );
  this.physics.add.collider(
    this.collectibes_no_static,
    this.mario,
    collectItem,
    null,
    this,
  );
  this.physics.world.setBounds(0, 0, 2000, config.height);

  this.physics.add.collider(this.mario, this.floor);
  this.physics.add.collider(this.enemies, this.floor);
  this.physics.add.collider(
    this.enemies,
    this.blocks,
    collectObject,
    null,
    this,
  );

  this.physics.add.collider(this.mario, this.enemies, onHitEnemy, null, this);

  this.physics.add.collider(this.mario, this.blocks, onHitBlock, null, this);

  this.cameras.main.setBounds(0, 0, 2000, config.height);
  this.cameras.main.startFollow(this.mario);

  this.keys = this.input.keyboard.createCursorKeys();
  this.WASD = this.input.keyboard.addKeys("W,A,S,D");

  this.enemies.getChildren().forEach((enemy) => {
    enemy.anims.play("goomba-walk", true);
  });
} //2.

//collaider de los item
function collectItem(mario, item) {
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
//agregamos la puntuacion
function addToScore(scoreToAdd, origen, game) {
  const scoreText = game.add.text(origen.x, origen.y, scoreToAdd, {
    fontFamily: "pixel",
    fontSize: config.width / 40,
  });

  game.tweens.add({
    targets: scoreText,
    duration: 500,
    y: scoreText.y - 20,
    onComplete: () => {
      game.tweens.add({
        targets: scoreText,
        duration: 100,
        alpha: 0,
        onComplete: () => {
          scoreText.destroy();
        },
      });
    },
  });
}
//
function onHitBlock(mario, block) {
  const {
    texture: { key },
  } = block;

  if (key == "misteryBlock") {
    if (mario.body.touching.up && block.body.touching.down) {
      if (block.used) {
        return;
      }

      block.used = true;

      this.tweens.add({
        targets: block,
        y: block.y - 10, // sube
        duration: 100,
        yoyo: true, // vuelve abajo
        ease: "Power1",
      });

      const coin = this.physics.add.sprite(block.x, block.y - 20, "coin");

      coin.anims.play("coin-idle", true);

      coin.body.allowGravity = false;

      addToScore(100, coin, this);

      // animación moneda
      this.tweens.add({
        targets: coin,
        y: coin.y - 40,
        duration: 300,
        ease: "Linear",
        onComplete: () => {
          coin.destroy();
        },
      });
      setTimeout(() => {
        block.destroy();
        this.blocks.create(block.x, block.y, "emptyBlock");
      }, 400);
    }
  } else if (key === "block") {
    if (
      mario.isGrown === true &&
      mario.body.touching.up &&
      block.body.touching.down
    ) {
      block.destroy();
    } else if (mario.body.touching.up && block.body.touching.down) {
      this.tweens.add({
        targets: block,
        y: block.y - 10, // sube
        duration: 100,
        yoyo: true, // vuelve abajo
        ease: "Power1",
      });
    }
  } else if (key === "misteryBlock-mushroom") {
    if (mario.body.touching.up && block.body.touching.down) {
      if (block.used) return;
      block.used = true;

      // Animación del bloque
      this.tweens.add({
        targets: block,
        y: block.y - 10,
        duration: 100,
        yoyo: true,
        ease: "Power1",
      });

      const mushroom = this.collectibes_no_static
        .create(block.x, block.y - 20, "mushroom")
        .setGravityY(300);

      // Empieza sin gravedad para la animación de "salida"
      mushroom.body.allowGravity = false;

      // Animación de salida: sube un poco
      this.tweens.add({
        targets: mushroom,
        y: mushroom.y - 24, // sube un bloque
        duration: 300,
        ease: "Linear",

        onComplete: () => {
          // Cuando termina de salir, activamos física y lo movemos
          mushroom.body.allowGravity = true;
          mushroom.setVelocityX(Math.random() > 0.5 ? 60 : -60); // camina hacia la derecha
          // Overlap con Mario para recolectarlo
        },
      });

      // Reemplazar bloque
      setTimeout(() => {
        block.destroy();
        this.blocks.create(block.x, block.y, "emptyBlock");
      }, 400);
    }
  }
}

function onHitEnemy(mario, enemy) {
  if (mario.body.touching.down && enemy.body.touching.up) {
    enemy.anims.play("goomba-death", true);
    enemy.setVelocityX(0);
    mario.setVelocityY(-200);

    playSound("stomp", this); //importamos el sonido de pisotón
    addToScore(200, enemy, this);

    setTimeout(() => {
      enemy.destroy();
    }, 500);
  } else {
    if (mario.isGrown === true) {
      this.physics.world.pause();
      this.anims.pauseAll();

      let i = 0;

      const interval = setInterval(() => {
        i++;

        mario.anims.play(i % 2 === 0 ? "mario-grown-idle" : "mario-idle");
      }, 100);

      mario.isBlocked = true;
      playSound("powerdown", this);

      setTimeout(() => {
        mario.isGrown = false;
        mario.setDisplaySize(18, 16);
        mario.body.setSize(18, 16);

        this.anims.resumeAll();
        mario.isBlocked = false;
        clearInterval(interval);
        this.physics.world.resume();
      }, 1000);
    } else {
      killMario(this);
    }
  }
}

// Si llega a un borde, cambia de dirección
function collectObject(item, block) {
  const {
    texture: { key },
  } = block;

  if (key === "vertical-small-tube") {
    if (item.body.touching.right && block.body.touching.left) {
      item.setVelocityX(-60);
    } else if (item.body.touching.left && block.body.touching.right) {
      item.setVelocityX(60);
    }
  } else if (key === "vertical-medium-tube") {
    if (item.body.touching.right && block.body.touching.left) {
      item.setVelocityX(-60);
    } else if (item.body.touching.left && block.body.touching.right) {
      item.setVelocityX(60);
    }
  }
}
function update() {
  checkControls(this); //importamos los controles y le pasamos el contexto del juego con call

  const { mario, sound, scene } = this; //desestructuramos para no escribir this cada vez

  if (mario.x > this.maxX) {
    this.maxX = mario.x;
  }
  //check Mario death
  if (mario.y >= config.height) {
    killMario(this);
  }
} //3. continuamente

function killMario(game) {
  const { mario, scene } = game; //desestructuramos para no escribir this cada vez

  if (mario.isDown) {
    return;
  }

  mario.isDown = true;
  mario.anims.play("mario-death", true);
  mario.setCollideWorldBounds(false);

  playSound("gameover", game); //importamos el sonido de muerte

  mario.body.checkCollision.none = true;
  mario.setVelocityX(0);

  setTimeout(() => {
    mario.setVelocityY(-300);
  }, 100);

  setTimeout(() => {
    scene.restart();
  }, 7000);
}
