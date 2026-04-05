export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 16;
export const VIEWPORT_PADDING = 0.9;
export const PLAYER_SPEED = 4;
export const PLAYER_START_X = 5;
export const PLAYER_START_Y = 5;

export function getViewportScale(
  screenWidth: number,
  screenHeight: number,
  mapWidth: number,
  mapHeight: number,
) {
  const worldWidth = (mapWidth + mapHeight) * (TILE_WIDTH / 2) + TILE_WIDTH;
  const worldHeight = (mapWidth + mapHeight) * (TILE_HEIGHT / 2) + TILE_WIDTH;

  return (
    Math.max(
      1,
      Math.min(screenWidth / worldWidth, screenHeight / worldHeight) *
        VIEWPORT_PADDING,
    )
  );
}
