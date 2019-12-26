type SpacingLevel = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
const base = 8;

/**
 * Returns the amount of spacing which is a multiple of the base of 8
 *
 * @param level 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
 */
export const spacing = (level: SpacingLevel): number => level * base;
