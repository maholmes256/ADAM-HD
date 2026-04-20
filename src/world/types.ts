export type TileId = "sand" | "dirt";

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
