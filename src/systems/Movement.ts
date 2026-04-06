import PlayerControlled from "../components/PlayerControlled";
import Transform from "../components/Transform";
import { PLAYER_SPEED, TILE_HEIGHT, TILE_WIDTH } from "../config";
import { defaultMap } from "../data/defaultMap";
import { Engine } from "../core/Engine";
import { System } from "../core/types";
import { gameState } from "../store/gameState";
import { isometricToScreen, screenToIsometric } from "../utils/isometricMath";

const ACTIVE_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "w",
  "a",
  "s",
  "d",
]);

export default class MovementSystem implements System {
  private readonly pressedKeys = new Set<string>();
  private readonly speed: number;

  constructor(speed = PLAYER_SPEED) {
    this.speed = speed;

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  tick(delta: number, engine: Engine) {
    const direction = this.getDirection();
    const screenDistance = this.speed * TILE_HEIGHT * (delta / 1000);
    const moveX = direction.x * screenDistance;
    const moveY = direction.y * screenDistance;

    const players = engine.getEntitiesWith([PlayerControlled, Transform]);
    for (const entity of players) {
      const player = engine.getComponent(entity, PlayerControlled) as
        | PlayerControlled
        | undefined;
      const transform = engine.getComponent(entity, Transform) as Transform | undefined;
      if (!transform || !player) {
        continue;
      }

      player.isMoving = direction.screenX !== 0 || direction.screenY !== 0;
      if (player.isMoving) {
        player.facing = this.getFacingDirection(direction.screenX, direction.screenY);
      }

      if (!player.isMoving) {
        continue;
      }

      transform.x = clamp(transform.x + moveX, 0, defaultMap.width - 1);
      transform.y = clamp(transform.y + moveY, 0, defaultMap.height - 1);

      gameState.camera.x = transform.x;
      gameState.camera.y = transform.y;
      gameState.camera.z = transform.z;
    }
  }

  private readonly handleKeyDown = (event: KeyboardEvent) => {
    if (ACTIVE_KEYS.has(event.key)) {
      this.pressedKeys.add(event.key);
    }
  };

  private readonly handleKeyUp = (event: KeyboardEvent) => {
    this.pressedKeys.delete(event.key);
  };

  private getDirection() {
    let screenX = 0;
    let screenY = 0;

    if (this.pressedKeys.has("ArrowUp") || this.pressedKeys.has("w")) {
      screenY -= 1;
    }
    if (this.pressedKeys.has("ArrowDown") || this.pressedKeys.has("s")) {
      screenY += 1;
    }
    if (this.pressedKeys.has("ArrowLeft") || this.pressedKeys.has("a")) {
      screenX -= 1;
    }
    if (this.pressedKeys.has("ArrowRight") || this.pressedKeys.has("d")) {
      screenX += 1;
    }

    if (screenX !== 0 || screenY !== 0) {
      const magnitude = Math.hypot(screenX, screenY);
      screenX /= magnitude;
      screenY /= magnitude;
    }

    const iso = screenToIsometric(screenX, screenY, TILE_WIDTH, TILE_HEIGHT);

    return {
      x: iso.x,
      y: iso.y,
      screenX,
      screenY,
    };
  }

  private getFacingDirection(
    x: number,
    y: number,
  ): PlayerControlled["facing"] {
    if(y < 0){
      if(x > 0){
        return "northeast";
      }else if (x < 0){
        return "northwest";
      }
      return "north";
    }else{
      if(x > 0){
        return "southeast";
      }else if (x < 0){
        return "southwest";
      }
      return "south";
    }
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
