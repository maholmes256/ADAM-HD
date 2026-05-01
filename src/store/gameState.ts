import type { Engine } from "../core/Engine";

export type CameraState = {
  x: number;
  y: number;
  z: number;
  scale: number;
};

export const gameState: { camera: CameraState; world: Engine | null } = {
  camera: {
    x: 0,
    y: 0,
    z: 0,
    scale: 1,
  },
  world: null,
};
