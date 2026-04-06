import { Application, Container, Sprite, Texture } from "pixi.js";
import { getViewportScale, TILE_HEIGHT, TILE_WIDTH } from "../config";
import { defaultMap } from "../data/defaultMap";
import { Engine } from "../core/Engine";
import { System } from "../core/types";
import { gameState } from "../store/gameState";
import { isometricToScreen } from "../utils/isometricMath";
import { tileRegistry } from "../world/tileRegistry";

export default class GroundRenderSystem implements System {
  private readonly app: Application;
  private readonly container: Container;
  private readonly sprites: Sprite[] = [];

  constructor(app: Application) {
    this.app = app;
    this.container = new Container();
    this.container.sortableChildren = true;
    app.stage.addChild(this.container);

    for (let y = 0; y < defaultMap.height; y++) {
      for (let x = 0; x < defaultMap.width; x++) {
        const tileId = defaultMap.tiles[y]?.[x];
        if (!tileId) {
          continue;
        }

        const tileDef = tileRegistry[tileId];
        const sprite = new Sprite(Texture.from(tileDef.texture));
        // Keep tile sprites pixelated
        sprite.texture.source.scaleMode = "nearest";
        sprite.anchor.set(0.5, 0.75);
        sprite.zIndex = (x + y) * 10;
        this.container.addChild(sprite);
        this.sprites.push(sprite);
      }
    }
  }

  tick(dt: number, engine: Engine) {
    void dt;
    void engine;
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

    let index = 0;
    for (let y = 0; y < defaultMap.height; y++) {
      for (let x = 0; x < defaultMap.width; x++) {
        const sprite = this.sprites[index++];
        const screenPos = isometricToScreen(x, y, 0, TILE_WIDTH, TILE_HEIGHT);
        sprite.x = originX + (screenPos.x - cameraScreen.x) * scale;
        sprite.y = originY + (screenPos.y - cameraScreen.y) * scale;
        sprite.scale.set(scale);
      }
    }

    this.container.sortChildren();
  }
}
