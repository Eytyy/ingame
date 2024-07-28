import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const rgbToHsl = (r: number, g: number, b: number, a: number) => {
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const componentCase = max == r ? 0 : max == g ? 1 : 2; // is max r g or b?
  (r /= 255), (g /= 255), (b /= 255), (min /= 255), (max /= 255);
  let h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (componentCase) {
      case 0:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case 1:
        h = (b - r) / d + 2;
        break;
      case 2:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l, a];
};
