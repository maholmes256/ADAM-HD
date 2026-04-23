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
import { number } from "framer-motion";

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
  world.addComponent(player, new Transform(PLAYER_START_X, PLAYER_START_Y, 1));
  world.addComponent(player, playerControlled);

  

  //const listTrees = [{1, 2}, 2, 3];
interface coords {x:number, y: number};
const treeList: coords[] = [
  {x: -5, y: 1},
  {x: 3.75, y: 4},
  {x:31, y: 31},
];
treeList.forEach(({x, y}) => {
    const tree = world.createEntity();
    const treeSprite = new Sprite(treeTexture);
    world.addComponent(tree, new Transform(x, y, 0.25));
    world.addComponent(tree, new IsoSprite(treeSprite, 1.8));
});

const treesList: coords[] = [
  {x: 0, y: -2.3},
  {x:-5, y: 31.75},
];
treesList.forEach(({x, y}) => {
    const trees = world.createEntity();
    const treesSprite = new Sprite(treesTexture);
    world.addComponent(trees, new Transform(x, y, 0.20));
    world.addComponent(trees, new IsoSprite(treesSprite, 1.5));
});

const rockList: coords[] = [
  {x: 12, y: 2.5,},
  {x: 11.5, y: 2},
  {x: 25, y: 5},
  {x: 1, y: 25},
  {x: 11.5, y: 2},
  {x: -1.25, y: 10},
  {x: -0.5, y: 11.25},
  {x: 11.5, y: 2},
  {x: 11.5, y: 2},
  {x: 11.5, y: 2},
  {x: 11.5, y: 2},
  {x: 11.5, y: 2},
  {x: 11.5, y: 2},
{x: 18.21, y: 14.54},
{x: 27.65, y: -0.32},
{x: 9.43, y: 31.08},
{x: 14.88, y: 22.17},
{x: 21.03, y: -0.87},
{x: -0.12, y: 34.22},
{x: 16.76, y: 11.29},
{x: 29.54, y: 2.33},
{x: 4.87, y: 17.65},
{x: 33.41, y: 0.12},
{x: 11.23, y: 28.54},
{x: 24.32, y: 13.11},
{x: 19.56, y: 8.43},
{x: 5.12, y: 25.87},
{x: 31.04, y: 14.32},
{x: 12.67, y: 1.23},
{x: 26.89, y: 33.12},
{x: 15.43, y: 18.76},
{x: 34.54, y: 4.56},
{x: 8.12, y: 21.34},
{x: 22.76, y: 32.45},
{x: 3.45, y: 16.54},
{x: 28.12, y: 29.87},
{x: 17.89, y: 12.43},
{x: 30.12, y: 26.54},
{x: 25.43, y: 19.21},
{x: 10.12, y: 34.87},
{x: 14.56, y: 15.67},
{x: 33.21, y: 8.76},
{x: 9.67, y: 23.45},
{x: 21.43, y: 1.87},
{x: 0.23, y: 31.23},
{x: 16.54, y: -0.98},
{x: 29.76, y: 14.21},
{x: 5.67, y: 27.34},
{x: 18.32, y: 3.45},
{x: 32.45, y: 20.12},
{x: 7.23, y: 13.56},
{x: 24.56, y: 28.76},
{x: 14.28, y: 3.12},
{x: -0.56, y: 22.84},
{x: 18.45, y: 29.37},
{x: 7.62, y: 12.05},
{x: 24.11, y: 34.28},
{x: 31.87, y: 19.42},
{x: 12.03, y: 8.67},
{x: 20.36, y: 0.24},
{x: 29.58, y: 15.76},
{x: 11.25, y: 23.41},
{x: -0.73, y: 10.18},
{x: 16.94, y: 4.59},
{x: 25.47, y: 33.02},
{x: 22.64, y: 17.83},
{x: 30.15, y: 6.72},
{x: 4.22, y: 21.09},
{x: 13.78, y: 32.44},
{x: -0.95, y: 14.61},
{x: 27.81, y: 0.88},
{x: 6.44, y: 9.27},
{x: 33.56, y: -0.65},
{x: 10.09, y: 25.14},
{x: 2.76, y: 18.39},
{x: 21.53, y: 34.72},
{x: 15.68, y: 2.11},
{x: 28.29, y: 11.45},
{x: -0.32, y: 30.67},
{x: 32.41, y: 5.92},
{x: 9.54, y: 20.28},
{x: 23.87, y: -0.78},
{x: 17.11, y: 13.96},
{x: 0.45, y: 26.51},
{x: 34.93, y: 8.04},
{x: 11.72, y: 1.33},
{x: 26.04, y: 31.17},
{x: 14.96, y: 24.89},
{x: -0.82, y: 16.43},
{x: 30.77, y: 2.98},
{x: 12.35, y: 27.56},
{x: 21.19, y: 19.81},

  
];
rockList.forEach(({x, y}) => {
    const rock = world.createEntity();
    const rockSprite = new Sprite(rockTexture);
    world.addComponent(rock, new Transform(x, y, 0.25));
    world.addComponent(rock, new IsoSprite(rockSprite, 0.4));
});

const cactusList: coords[] = [
  {x: 8.4, y: -0.5,},
  {x:2, y: 20},
  {x:3.2, y: 16.64},
];
cactusList.forEach(({x, y}) => {
    const cactus = world.createEntity();
    const cactusSprite = new Sprite(cactusTexture);
    world.addComponent(cactus, new Transform(x, y, 0.15));
    world.addComponent(cactus, new IsoSprite(cactusSprite, 0.25));
});

const houseList: coords[] = [
  {x: 9.4, y: -1.65,},
];
houseList.forEach(({x, y}) => {
    const house = world.createEntity();
    const houseSprite = new Sprite(houseTexture);
    world.addComponent(house, new Transform(x, y, -0.25));
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
