export type TileId = "sand" | "grass" | "water" | "waterC" | "waterCN" | "dirt" | "dirtS" | "spawnpoint" | "pathH" | "pathV" | "pathCN" | "pathCS" | "pathCW" | "pathCE" | "grassRivE" | "grassRivW" | "grassRivS" | "grassRivN" | 
"sandRivE" | "sandRivN";

export type TileDef = {
  id: TileId;
  texture: string;
  elevation?: number;
};

export type WorldMap = {
  id: string;
  width: number;
  height: number;
  tiles: TileId[][];
};
