import { TileDef, TileId } from "./types.ts";

export const tileRegistry: Record<TileId, TileDef> = {
  grass: {
    id: "grass",
    texture: "/assets/tiles/grass.png",
  },
  dirt: {
    id: "dirt",
    texture: "/assets/tiles/dirt.png",
  },
};
