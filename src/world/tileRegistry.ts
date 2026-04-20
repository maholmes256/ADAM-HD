import { TileDef, TileId } from "./types.ts";

export const tileRegistry: Record<TileId, TileDef> = {
  sand: {
    id: "sand",
    texture: "/assets/tiles/sand_center_S.png",
  },
  dirt: {
    id: "dirt",
    texture: "/assets/tiles/dirt_center_S.png",
  },
};
