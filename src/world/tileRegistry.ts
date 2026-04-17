import { TileDef, TileId } from "./types.ts";

export const tileRegistry: Record<TileId, TileDef> = {
  grass: {
    id: "grass",
    texture: "/assets/tiles/grass_center_S.png",
  },
  dirt: {
    id: "dirt",
    texture: "/assets/tiles/dirt_center_S.png",
  },
};
