"use client";

export interface ISquare {
  color: {
    h: number;
    s: number;
    l: number;
  };
  rowIndex: number;
  visibilityChance: number;
}

export function drawPixilatedImage({
  w,
  h,
  pixelationLevel,
  saturationLevel,
  image,
  output = "canvas",
}: {
  w: number;
  h: number;
  pixelationLevel: number;
  saturationLevel: number;
  image: HTMLImageElement;
  output?: "canvas" | "squares";
}): HTMLCanvasElement | ISquare[] {
  const offscreenCanvas = document.createElement("canvas");
  offscreenCanvas.width = w;
  offscreenCanvas.height = h;
  const ctx = offscreenCanvas.getContext("2d");

  if (!ctx) return offscreenCanvas;
  const pl = Math.round(w / pixelationLevel);

  ctx.drawImage(image, 0, 0, w, h);
  const imgData = ctx.getImageData(0, 0, w, h);
  ctx.clearRect(0, 0, w, h);

  for (let y = 0; y < h; y += pl) {
    for (let x = 0; x < w; x += pl) {
      let i = (x + y * w) * 4;
      let r = imgData.data[i];
      let g = imgData.data[i + 1];
      let b = imgData.data[i + 2];
      let a = imgData.data[i + 3];
      const [h, s, l] = rgbToHsl(r, g, b, a);
      const adjustedS = s * saturationLevel;
      ctx.fillStyle = `hsl(${h * 360}, ${adjustedS * 100}%, ${l * 100}%)`;
      ctx.fillRect(x, y, pl, pl);
    }
  }

  if (output === "squares") {
    const squares = [];
    for (let y = 0; y < h; y += pl) {
      for (let x = 0; x < w; x += pl) {
        let i = (x + y * w) * 4;
        let r = imgData.data[i];
        let g = imgData.data[i + 1];
        let b = imgData.data[i + 2];
        let a = imgData.data[i + 3];
        const firstOrLastRow = y === 0 || y === h - pl;
        const hsl = rgbToHsl(r, g, b, a);
        const adjustedS = hsl[1] * saturationLevel;
        squares.push({
          color: {
            h: hsl[0] * 360,
            s: adjustedS * 100,
            l: hsl[2] * 100,
          },
          rowIndex: y / pl,
          visibilityChance: firstOrLastRow ? (Math.random() > 0.5 ? 0 : 1) : 0,
        });
      }
    }
    return squares;
  }

  return offscreenCanvas;
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
