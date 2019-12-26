export type TypeLevel = -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Returns the font size given the level
 *
 * @param level
 *    -4 (9), -3 (10), -2 (12), -1 (14), 0 (16),
 *    1 (18), 2 (20), 3 (24), 4 (32), 5 (40), 6 (48), 7 (56)
 */
export const typeScale = (level: TypeLevel): number => {
  if (level < 0) {
    return [14, 12, 10, 9][Math.abs(level) - 1];
  } else {
    return [16, 18, 20, 24, 32, 40, 48, 56][level];
  }
};
