export const DARK = "#4f4f4f";
export const LIGHT = "#e0e0e0";
export const LIGHT_ALT = "#828282";
export const LIGHT_RED_TINGE = "#d09a9a";
export const VERY_LIGHT = "#f2f2f2";

export const GREEN_10 = "#EFFAF4";
export const GREEN_20 = "#DAF9E7";
export const GREEN_30 = "#12964A";
export const RED_10 = "#FCF3F3";
export const RED_20 = "#FCE7E7";
export const RED_30 = "#E74343";
export const YELLOW_10 = "#FEF9EB";
export const YELLOW_20 = "#FDF2CE";

const palette: { [color in ColorName]: { [tone: string]: string } } = {
  grey: {
    "0": "#FFFFFF",
    "5": "#FEFCFA",
    "10": "#F2F2F2",
    "20": "#828282",
    "30": "#4F4F4F",
    "40": "#333333",
    "100": "#000000"
  },
  orange: {
    "10": "#FEF6EB",
    "20": "#FDEACE",
    "30": "#FBB976",
    "40": "#F9B043"
  },
  blue: {
    "50": "#2A3846"
  },
  green: {
    "10": "#EFFAF4",
    "20": "#DAF9E7",
    "30": "#12964A"
  },
  red: {
    "10": "#FCF3F3",
    "20": "#FCE7E7",
    "30": "#E74343"
  }
};

export type ColorName = "grey" | "orange" | "blue" | "green" | "red";
export type ToneLevel = 0 | 5 | 10 | 15 | 20 | 30 | 40 | 50 | 100;

export function color(
  colorName: "grey",
  tone: 0 | 5 | 10 | 20 | 30 | 40 | 100
): string;
export function color(colorName: "orange", tone: 10 | 20 | 30 | 40): string;
export function color(colorName: "green", tone: 10 | 20 | 30): string;
export function color(colorName: "red", tone: 10 | 20 | 30): string;
export function color(colorName: "blue", tone: 50): string;
/**
 * Returns the color according to the given color name and tone.
 *
 * @param colorName grey, orange, blue, green, red
 * @param tone based on the colorName
 */
export function color(colorName: ColorName, tone: ToneLevel): string {
  return palette[colorName][tone];
}
