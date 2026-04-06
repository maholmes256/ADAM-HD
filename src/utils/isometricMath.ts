/* Converts 3D isometric coordinates (x, y, z)
* to Screen coordinates (x, y)*/
export function isometricToScreen(x: number, y: number, z: number = 0, tileWidth: number = 1, tileHeight: number = 1): {x: number, y: number} {
  let sX = (x - y) * (tileWidth / 2);
  let sY = (x + y) * (tileHeight / 2) - z;

  return {x: sX, y: sY};
}

/* Converts screen coordinates (x, y)
* to isometric coordinates (x, y, z = 0)*/
export function screenToIsometric(x: number, y: number, tileWidth: number = 1, tileHeight: number = 1): {x: number, y: number, z: number} {
  let iX = x / tileWidth + y / tileHeight;
  let iY = y / tileHeight - x / tileWidth;

  return {x: iX, y: iY, z: 0};
}
