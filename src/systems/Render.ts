import { Container } from "pixi.js";
import { System } from "../core/types";
import { Engine } from "../core/Engine";
import Renderable from "../components/Renderable";
import Transform from "../components/Transform";
import { isometricToScreen } from "../utils/isometricMath";

export default class RenderSystem implements System {
  private container: Container;

  constructor(stage: Container) {
    this.container = new Container();
    // Enable Pixi's built-in sorting logic
    this.container.sortableChildren = true;
    stage.addChild(this.container);
  }

  tick(dt: number, engine: Engine) {
    const entities = engine.getEntitiesWith([Transform, Renderable]);
    for (const entity of entities) {
      // Use '!' because getEntitiesWith guarantees these exist
      const transform = engine.getComponent(entity, Transform)! as Transform;
      const visual = engine.getComponent(entity, Renderable)! as Renderable;

      const screenPos = isometricToScreen(transform.x, transform.y, transform.z);
      
      visual.sprite.x = screenPos.x;
      visual.sprite.y = screenPos.y;

      // We set zIndex so Pixi draws them in the correct order.
      visual.sprite.zIndex = (transform.x + transform.y) * 10;

      if (!visual.sprite.parent) {
        this.container.addChild(visual.sprite);
      }
    }

    this.container.sortChildren();
  }
}
