export type BorderRadiusLevel = 1 | 2 | 3 | 4 | 5;

/**
 * Returns the border radius for the given level
 *
 * @param level 1 (2), 2 (4), 3 (8), 4 (16), 5 (24)
 */
export const borderRadius = (level: BorderRadiusLevel): number =>
  [2, 4, 8, 16, 24][level - 1];
