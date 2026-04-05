import { Application, Container } from "pixi.js";
import { System } from "../core/types";
import { Engine } from "../core/Engine";
import Renderable from "../components/IsoSprite";
import Transform from "../components/Transform";
import { getViewportScale, TILE_HEIGHT, TILE_WIDTH } from "../config";
import { defaultMap } from "../data/defaultMap";
import { isometricToScreen } from "../utils/isometricMath";
import { gameState } from "../store/gameState";

export default class RenderSystem implements System {
  private container: Container;
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    this.container = new Container();
    this.container.sortableChildren = true;
    app.stage.addChild(this.container);
  }

  tick(dt: number, engine: Engine) {
    const camera = gameState.camera;
    const scale = getViewportScale(
      this.app.screen.width,
      this.app.screen.height,
      defaultMap.width,
      defaultMap.height,
    );
    camera.scale = scale;
    const cameraScreen = isometricToScreen(
      camera.x,
      camera.y,
      camera.z,
      TILE_WIDTH,
      TILE_HEIGHT,
    );
    const originX = this.app.screen.width / 2;
    const originY = this.app.screen.height / 2;

    const entities = engine.getEntitiesWith([Transform, Renderable]);
    for (const entity of entities) {
      const transform = engine.getComponent(entity, Transform)! as Transform;
      const visual = engine.getComponent(entity, Renderable)! as Renderable;

      const screenPos = isometricToScreen(transform.x, transform.y, transform.z, TILE_WIDTH, TILE_HEIGHT);

      visual.sprite.x = originX + (screenPos.x - cameraScreen.x) * scale;
      visual.sprite.y = originY + (screenPos.y - cameraScreen.y) * scale;
      visual.sprite.scale.set(scale);

      visual.sprite.zIndex = (transform.x + transform.y) * 10;

      if (!visual.sprite.parent) {
        this.container.addChild(visual.sprite);
      }
    }

    this.container.sortChildren();
  }
}
