import { AnimatedSprite, Rectangle, Texture } from "pixi.js";
import { FacingDirection } from "../components/PlayerControlled";

const CHARACTER_SPRITE_PATH = "/assets/character.png";
const CHARACTER_FRAME_WIDTH = 48;
const CHARACTER_FRAME_HEIGHT = 64;

const DIRECTION_TO_ROW: Record<FacingDirection, number> = {
  south: 0,
  southwest: 1,
  northwest: 2,
  north: 3,
  northeast: 4,
  southeast: 5,
};

const animationState = new WeakMap<AnimatedSprite, FacingDirection>();

function getFrames(direction: FacingDirection): Texture[] {
  const baseTexture = Texture.from(CHARACTER_SPRITE_PATH);
  baseTexture.source.scaleMode = "nearest";

  return Array.from({ length: 8 }, (_, column) => {
    return new Texture({
      source: baseTexture.source,
      frame: new Rectangle(
        column * CHARACTER_FRAME_WIDTH,
        DIRECTION_TO_ROW[direction] * CHARACTER_FRAME_HEIGHT,
        CHARACTER_FRAME_WIDTH,
        CHARACTER_FRAME_HEIGHT,
      ),
    });
  });
}

export function createPlayerSprite(initialFacing: FacingDirection): AnimatedSprite {
  const sprite = new AnimatedSprite(getFrames(initialFacing));
  sprite.anchor.set(0.5, 0.82);
  sprite.animationSpeed = 0.16;
  sprite.play();
  animationState.set(sprite, initialFacing);
  return sprite;
}

export function syncPlayerSpriteAnimation(
  sprite: AnimatedSprite,
  facing: FacingDirection,
  isMoving: boolean,
): void {
  const currentFacing = animationState.get(sprite);
  if (currentFacing !== facing) {
    sprite.textures = getFrames(facing);
    sprite.gotoAndPlay(0);
    animationState.set(sprite, facing);
  }

  if (isMoving) {
    if (!sprite.playing) {
      sprite.play();
    }
    return;
  }

  sprite.gotoAndStop(0);
}
