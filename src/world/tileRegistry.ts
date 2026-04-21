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

  tile: {
    id: "tile",
    texture: "/assets/tiles/tiles_E.png",
  },

  grass: {
    id: "grass",
    texture: "/assets/tiles/grass_center_S.png",
  },

  water: {
    id: "water",
    texture: "/assets/tiles/water_center_N.png",
  },


  waterC: {
    id: "waterC",
    texture: "/assets/tiles/grass_waterConvex_N.png",
  },

  waterCN: {
    id: "waterCN",
    texture: "/assets/tiles/sand_waterConvex_S.png",
  },

  dirtS: {
    id: "dirtS",
    texture: "/assets/tiles/dirt_low_N.png",
  },

   spawnpoint: {
    id: "spawnpoint",
    texture: "/assets/tiles/tiles_decorated_W.png",
  },

   pathH: {
    id: "pathH",
    texture: "/assets/tiles/sand_path_N.png",
  },

   pathV: {
    id: "pathV",
    texture: "/assets/tiles/sand_path_W.png",
  },

   pathCN: {
    id: "pathCN",
    texture: "/assets/tiles/sand_pathCorner_N.png",
  },

   pathCS: {
    id: "pathCS",
    texture: "/assets/tiles/sand_pathCorner_S.png",
  },

   pathCW: {
    id: "pathCW",
    texture: "/assets/tiles/sand_pathCorner_W.png",
  },

  pathCE: {
    id: "pathCE",
    texture: "/assets/tiles/sand_pathCorner_E.png",
  },

  grassRivE: {
    id: "grassRivE",
    texture: "/assets/tiles/grass_water_E.png",
  },

  grassRivW: {
    id: "grassRivW",
    texture: "/assets/tiles/grass_water_W.png",
  },

  grassRivN: {
    id: "grassRivN",
    texture: "/assets/tiles/grass_water_N.png",
  },

  grassRivS: {
    id: "grassRivS",
    texture: "/assets/tiles/grass_water_S.png",
  },


  sandRivE: {
    id: "sandRivE",
    texture: "/assets/tiles/sand_water_E.png",
  },

  sandRivN: {
    id: "sandRivN",
    texture: "/assets/tiles/sand_water_S.png",
  },


  
};
