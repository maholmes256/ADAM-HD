export const TILE_WIDTH = 220;
export const TILE_HEIGHT = 100;
export const VIEWPORT_PADDING = 0.9;
export const CAMERA_VIEW_FRACTION = 0.3;
export const PLAYER_SPEED = 8;
export const PLAYER_START_X = 5;
export const PLAYER_START_Y = 5;

export function getViewportScale(
  screenWidth: number,
  screenHeight: number,
  mapWidth: number,
  mapHeight: number,
) {
  const visibleMapWidth = mapWidth * CAMERA_VIEW_FRACTION;
  const visibleMapHeight = mapHeight * CAMERA_VIEW_FRACTION;
  const worldWidth =
    (visibleMapWidth + visibleMapHeight) * (TILE_WIDTH / 2) + TILE_WIDTH;
  const worldHeight =
    (visibleMapWidth + visibleMapHeight) * (TILE_HEIGHT / 2) + TILE_WIDTH;

  return (
    Math.max(
      1,
      Math.min(screenWidth / worldWidth, screenHeight / worldHeight) *
        VIEWPORT_PADDING,
    )
  );
}
