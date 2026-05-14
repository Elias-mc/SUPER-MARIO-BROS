import { playSound } from "./sound.js";

const MARIO_ANIMATIONS = {
  grown: {
    idle: "mario-grown-idle",
    walk: "mario-grown-walk",
    jump: "mario-grown-jump",
  },
  normal: {
    idle: "mario-idle",
    walk: "mario-walk",
    jump: "mario-jump",
  },
};

export function checkControls({ mario, keys, WASD, sound }) {
  const isMarioTouchingFloor = mario.body.touching.down;

  if (mario.isDown) {
    return;
  }

  if (mario.isBlocked) return;

  const marioAnimations = mario.isGrown
    ? MARIO_ANIMATIONS.grown
    : MARIO_ANIMATIONS.normal;

  const speed = 90;
  //LEFT AND RIGHT
  if (keys.left.isDown || WASD.A.isDown) {
    isMarioTouchingFloor && mario.anims.play(marioAnimations.walk, true);
    mario.setVelocityX(-speed);
    mario.flipX = true;
  } else if (keys.right.isDown || WASD.D.isDown) {
    isMarioTouchingFloor && mario.anims.play(marioAnimations.walk, true);
    mario.setVelocityX(speed);
    mario.flipX = false;
  } else if (isMarioTouchingFloor) {
    mario.anims.play(marioAnimations.idle, true);
    mario.setVelocityX(0);
  }

  //JUMP
  if ((keys.up.isDown || keys.space.isDown) && isMarioTouchingFloor) {
    mario.setVelocityY(-300);
    mario.anims.play(marioAnimations.jump, true);
    playSound("jump", { sound });
  }
}
