import Transform from "./components/Transform";
import PlayerControlled from "./components/PlayerControlled";
import { Application, Assets } from "pixi.js";
import { createPlayerSprite } from "./animation/playerSprite";
import {
  PLAYER_START_X,
  PLAYER_START_Y,
  getViewportScale,
} from "./config";
import { Engine } from "./core/Engine";
import { defaultMap } from "./data/defaultMap";
import GroundRenderSystem from "./systems/GroundRender";
import MovementSystem from "./systems/Movement";
import RenderSystem from "./systems/Render";
import IsoSprite from "./components/IsoSprite";
import { gameState } from "./store/gameState";
import { tileRegistry } from "./world/tileRegistry";

const CHARACTER_SPRITE_PATH = "/assets/character.png";

export default async function bootstrap(): Promise<void> {
  const world = new Engine();
  const app = new Application();

  await app.init({ background: "#1099bb", resizeTo: window });
  app.canvas.style.imageRendering = "pixelated";
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const tileTextures = Object.values(tileRegistry).map((tile) => ({
    alias: tile.texture,
    src: tile.texture,
    data: { scaleMode: "nearest" as const },
  }));
  await Assets.load([
    ...tileTextures,
    {
      alias: CHARACTER_SPRITE_PATH,
      src: CHARACTER_SPRITE_PATH,
      data: { scaleMode: "nearest" as const },
    },
  ]);

  gameState.camera.scale = getViewportScale(
    app.screen.width,
    app.screen.height,
    defaultMap.width,
    defaultMap.height,
  );

  const player = world.createEntity();
  const playerControlled = new PlayerControlled();
  const playerSprite = createPlayerSprite(playerControlled.facing);

  world.addComponent(player, new IsoSprite(playerSprite));
  world.addComponent(player, new Transform(PLAYER_START_X, PLAYER_START_Y, 0));
  world.addComponent(player, playerControlled);

  gameState.camera.x = PLAYER_START_X;
  gameState.camera.y = PLAYER_START_Y;

  world.addSystem(new GroundRenderSystem(app));
  world.addSystem(new MovementSystem());
  world.addSystem(new RenderSystem(app));

  app.ticker.add((time) => {
    world.tick(time.deltaMS);
  });
}
