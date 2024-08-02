"use client";

import { MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { drawPixilatedImage, ISquare } from "@/lib/canvas.utils";
import ImageSquare from "./ImageSquare";

export function AnimatedPixelatedImage({
  image,
  scrollYProgress,
}: {
  image: HTMLImageElement;
  scrollYProgress: MotionValue<number>;
}) {
  const { noOfRows, cellW, windowHeight } = useAppContext();
  const squares =
    typeof window !== "undefined"
      ? (drawPixilatedImage({
          image,
          w:
            window.innerWidth < 1024
              ? window.innerWidth
              : Math.round(cellW * 7),
          h:
            window.innerWidth < 1024
              ? window.innerWidth
              : Math.round(windowHeight - cellW),
          pixelationLevel: window.innerWidth < 1024 ? 12 : 7,
          saturationLevel: 1,
          output: "squares",
        }) as ISquare[])
      : [];
  const [cellsInView, setCellsInView] = React.useState(0);

  const noOfCells = useTransform(
    scrollYProgress,
    [0, 0.333],
    [0, squares.length],
  );

  useMotionValueEvent(noOfCells, "change", (latest) => {
    const no = Math.round(latest);
    setCellsInView(no);
  });

  const rowProgress = useTransform(
    scrollYProgress,
    [0.333, 0.666],
    [0, noOfRows],
  );

  const cellsToRender = squares.slice(0, cellsInView);
  return (
    <>
      {cellsToRender.map((s, index) => (
        <ImageSquare
          rowProgress={rowProgress}
          key={`pixel-${index}`}
          square={s}
        />
      ))}
    </>
  );
}
