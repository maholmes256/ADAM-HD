import Transform from "./components/Transform";
import PlayerControlled from "./components/PlayerControlled";
import { Application, Assets, Graphics, Sprite, Texture } from "pixi.js";
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
import CollectibleOrb from "./components/CollectibleOrb";
import { gameState } from "./store/gameState";
import { uiState } from "./store/uiState";
import { tileRegistry } from "./world/tileRegistry";
import OrbInteractionSystem from "./systems/OrbInteractionSystem";

const CHARACTER_SPRITE_PATH = "/assets/character.png";
const MIN_ORB_COUNT = 20;
const orbTexture = await Assets.load('/assets/orb.png');
const treeTexture = await Assets.load('assets/tiles/tree_S.png')
const treesTexture = await Assets.load('assets/tiles/trees_N.png')
const rockTexture = await Assets.load('assets/tiles/rocks_W.png')
const houseTexture = await Assets.load('assets/tiles/building_sides_N.png')
const cactusTexture = await Assets.load('assets/tiles/cactus.png')

export default async function bootstrap(): Promise<void> {
  const world = new Engine();
  const app = new Application();

  await app.init({ background: "#A9C6E6", resizeTo: window });
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
  gameState.world = world;

  const player = world.createEntity();
  const playerControlled = new PlayerControlled();
  const playerSprite = createPlayerSprite(playerControlled.facing);

  world.addComponent(player, new IsoSprite(playerSprite, 4.5));
  world.addComponent(player, new Transform(PLAYER_START_X, PLAYER_START_Y, 0));
  world.addComponent(player, playerControlled);

  

  //const listTrees = [{1, 2}, 2, 3];
interface coords {x:number, y: number};
const treeList: coords[] = [
  {x: -5, y: 1},
  {x: 3.75, y: 4}
];
treeList.forEach(({x, y}) => {
    const tree = world.createEntity();
    const treeSprite = new Sprite(treeTexture);
    world.addComponent(tree, new Transform(x, y, 0.25));
    world.addComponent(tree, new IsoSprite(treeSprite, 1.8));
});

const treesList: coords[] = [
  {x: 0, y: -2.3},
];
treesList.forEach(({x, y}) => {
    const trees = world.createEntity();
    const treesSprite = new Sprite(treesTexture);
    world.addComponent(trees, new Transform(x, y, 0.25));
    world.addComponent(trees, new IsoSprite(treesSprite, 1.5));
});

const rockList: coords[] = [
  {x: 12, y: 2.5,},
  {x: 11.5, y: 2},
  {x: 25, y: 5},
  {x: 1, y: 25},
  {x: 11.5, y: 2},
  {x: 11.5, y: 2},
  {x: 11.5, y: 2},
  {x: 11.5, y: 2},
  {x: 11.5, y: 2},
  {x: 11.5, y: 2},
  {x: 11.5, y: 2},
  {x: 11.5, y: 2},
  {x: 11.5, y: 2},
  
];
rockList.forEach(({x, y}) => {
    const rock = world.createEntity();
    const rockSprite = new Sprite(rockTexture);
    world.addComponent(rock, new Transform(x, y, 0.25));
    world.addComponent(rock, new IsoSprite(rockSprite, 0.4));
});

const cactusList: coords[] = [
  {x: 8.4, y: -0.5,},
];
cactusList.forEach(({x, y}) => {
    const cactus = world.createEntity();
    const cactusSprite = new Sprite(cactusTexture);
    world.addComponent(cactus, new Transform(x, y, 0.25));
    world.addComponent(cactus, new IsoSprite(cactusSprite, 0.25));
});

const houseList: coords[] = [
  {x: 9.4, y: -1.65,},
];
houseList.forEach(({x, y}) => {
    const house = world.createEntity();
    const houseSprite = new Sprite(houseTexture);
    world.addComponent(house, new Transform(x, y, 4.5));
    world.addComponent(house, new IsoSprite(houseSprite, 0.8));
});




  gameState.camera.x = PLAYER_START_X;
  gameState.camera.y = PLAYER_START_Y;

  spawnOrbs(world, app, MIN_ORB_COUNT);
  world.addSystem(new GroundRenderSystem(app));
  world.addSystem(new MovementSystem());
  world.addSystem(new OrbInteractionSystem());
  world.addSystem(new RenderSystem(app));

  app.ticker.add((time) => {
    world.tick(time.deltaMS);
  });
}

function spawnOrbs(world: Engine, app: Application, minimumCount: number) {
  const positions = createOrbSpawnPoints(
    defaultMap.width,
    defaultMap.height,
    minimumCount,
  );
  

  for (const [index, position] of positions.entries()) {
    const orb = world.createEntity();
    const orbSprite = new Sprite(orbTexture);
    orbSprite.anchor.set(0.5, 0.85);

    world.addComponent(orb, new CollectibleOrb((index % 3) + 1));
    world.addComponent(orb, new Transform(position.x, position.y, 0.25));
    world.addComponent(orb, new IsoSprite(orbSprite, .8));
  }

  uiState.setOrbCounts(positions.length);
}

function createOrbSpawnPoints(mapWidth: number, mapHeight: number, count: number) {
  const positions: Array<{ x: number; y: number }> = [];
  const columns = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / columns);
  const usableWidth = mapWidth - 6;
  const usableHeight = mapHeight - 6;

  for (let row = 0; row < rows && positions.length < count; row += 1) {
    for (
      let column = 0;
      column < columns && positions.length < count;
      column += 1
    ) {
      const x = 3 + (usableWidth * (column + 0.5)) / columns;
      const y = 3 + (usableHeight * (row + 0.5)) / rows;

      if (Math.hypot(x - PLAYER_START_X, y - PLAYER_START_Y) < 5) {
        continue;
      }

      positions.push({ x, y });
    }
  }

  let fallbackOffset = 0;
  while (positions.length < count) {
    positions.push({
      x: 8 + fallbackOffset * 1.5,
      y: mapHeight - 8,
    });
    fallbackOffset += 1;
  }

  return positions;
}
