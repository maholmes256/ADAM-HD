import PlayerControlled from "../components/PlayerControlled";
import Transform from "../components/Transform";
import { PLAYER_SPEED } from "../config";
import { defaultMap } from "../data/defaultMap";
import { Engine } from "../core/Engine";
import { System } from "../core/types";
import { gameState } from "../store/gameState";

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
    if (direction.x === 0 && direction.y === 0) {
      return;
    }

    const distance = this.speed * (delta / 1000);
    const moveX = direction.x * distance;
    const moveY = direction.y * distance;

    const players = engine.getEntitiesWith([PlayerControlled, Transform]);
    for (const entity of players) {
      const transform = engine.getComponent(entity, Transform) as Transform | undefined;
      if (!transform) {
        continue;
      }

      transform.x = clamp(transform.x + moveX, -1, defaultMap.width - 1);
      transform.y = clamp(transform.y + moveY, -1, defaultMap.height - 1);

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

    let x = screenY + screenX;
    let y = screenY - screenX;

    if (x !== 0 && y !== 0) {
      const normalized = Math.SQRT1_2;
      x *= normalized;
      y *= normalized;
    }

    return { x, y };
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
