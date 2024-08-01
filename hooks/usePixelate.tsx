import { rgbToHsl } from "@/lib/canvas.utils";
import React from "react";

// define a generate squares function
// first we define an array to store the squares
// 1. use canvas to draw the image
// 2. get the image data
// 3. loop through the image data and and pushes the square color to the squares array
// 4. return the squares array
//
// the function accepts an image, dimensions, and pixelation level

export default function usePixelate({
  image,
  dimensions,
}: {
  image: HTMLImageElement | null;
  dimensions: { w: number; h: number };
}) {
  const generateSquares = React.useCallback(
    (
      image: HTMLImageElement,
      dimensions: { w: number; h: number },
      pixelationLevel: number,
    ) => {
      const squares = [];
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = dimensions.w;
      canvas.height = dimensions.h;
      const pl = Math.round(dimensions.w / pixelationLevel);
      const w = Math.floor(dimensions.w);
      const h = Math.floor(dimensions.h);

      if (context) {
        context.drawImage(image, 0, 0, w, h);
        const imgData = context.getImageData(0, 0, w, h);
        context.clearRect(0, 0, w, h);
        for (let y = 0; y < h; y += pl) {
          for (let x = 0; x < w; x += pl) {
            let i = (x + y * w) * 4;
            let r = imgData.data[i];
            let g = imgData.data[i + 1];
            let b = imgData.data[i + 2];
            let a = imgData.data[i + 3];

            const [h, s, l] = rgbToHsl(r, g, b, a);
            squares.push({
              color: {
                h: h * 360,
                s: s * 100,
                l: l * 100,
              },
              rowIndex: y / pl,
              visibilityChance: Math.random() > 0.2 ? 0 : 1,
            });
          }
        }
      }

      // delete the canvas
      canvas.remove();

      return squares;
    },
    [],
  );
  const squares = React.useMemo(() => {
    if (!image || !dimensions.w) return [];
    return generateSquares(image, dimensions, 7);
  }, [image, dimensions, generateSquares]);

  return squares;
}
