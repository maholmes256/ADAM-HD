import { WorldMap } from "../world/types";

export const defaultMap: WorldMap = {
  id: "default-meadow",
  width: 12,
  height: 12,
  tiles: [
    ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["grass", "grass", "grass", "grass", "grass", "dirt", "dirt", "grass", "grass", "grass", "grass", "grass"],
    ["grass", "grass", "grass", "grass", "dirt", "dirt", "dirt", "dirt", "grass", "grass", "grass", "grass"],
    ["grass", "grass", "grass", "dirt", "dirt", "grass", "grass", "dirt", "dirt", "grass", "grass", "grass"],
    ["grass", "grass", "dirt", "dirt", "grass", "grass", "grass", "grass", "dirt", "dirt", "grass", "grass"],
    ["grass", "dirt", "dirt", "grass", "grass", "grass", "grass", "grass", "grass", "dirt", "dirt", "grass"],
    ["grass", "dirt", "grass", "grass", "grass", "dirt", "dirt", "grass", "grass", "grass", "dirt", "grass"],
    ["grass", "dirt", "grass", "grass", "dirt", "dirt", "dirt", "dirt", "grass", "grass", "dirt", "grass"],
    ["grass", "grass", "dirt", "grass", "dirt", "grass", "grass", "dirt", "grass", "dirt", "grass", "grass"],
    ["grass", "grass", "dirt", "dirt", "dirt", "grass", "grass", "dirt", "dirt", "dirt", "grass", "grass"],
    ["grass", "grass", "grass", "grass", "dirt", "dirt", "dirt", "dirt", "grass", "grass", "grass", "grass"],
    ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
  ],
};
