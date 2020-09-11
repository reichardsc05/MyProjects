export function buildLevel(game, level) {
  let tiles = [];

  level.forEach((row, rowIndex) => {
    row.forEach((tile, tileIndex) => {
      if (tile === 1) {
        let position = {
          x: 80 * tileIndex,
          y: 75 + 24 * rowIndex
        };
        //tiles.push(new Tile(game, position));
      }
    });
  });

  return tiles;
}

export const level1 = [
  // [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
];

export const level2 = [
  [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
