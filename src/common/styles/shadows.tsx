import { color } from "./colors";

export type ElevationLevel = 1;
export interface ShadowProps {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

/**
 * Returns shadow props for the given elevation level
 *
 * @param elevationLevel 1
 * @param shadowColor defaults to black
 */
export const shadow = (
  elevationLevel: ElevationLevel,
  shadowColor = color("grey", 100)
): ShadowProps => {
  switch (elevationLevel) {
    case 1:
      return {
        shadowColor,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      };
  }
};
