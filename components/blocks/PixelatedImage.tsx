import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { drawPixilatedImage, ISquare } from "@/lib/canvas.utils";

export function FirstPixelatedImage({
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
          h: windowHeight - cellW,
          w: cellW * 7,
          pixelationLevel: 7,
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

export function PixelatedImage({ image }: { image: HTMLImageElement }) {
  const { cellW, windowHeight } = useAppContext();

  const squares = drawPixilatedImage({
    image,
    h: windowHeight - cellW,
    w: cellW * 7,
    pixelationLevel: 7,
    saturationLevel: 1,
    output: "squares",
  }) as ISquare[];

  return (
    <>
      {squares.map((s, index) => (
        <motion.div
          key={`pixel-${index}`}
          className="relative col-span-1 aspect-square"
          style={{
            backgroundColor: `hsl(${s.color.h}deg, ${s.color.s}%, ${s.color.l}%)`,
            opacity: s.visibilityChance === 1 ? 1 : 0,
          }}
        />
      ))}
    </>
  );
}

function ImageSquare({
  square,
  rowProgress,
}: {
  square: ISquare;
  rowProgress: MotionValue<number>;
}) {
  const opacity = useTransform(rowProgress, (value) => {
    const row = Math.round(value);
    const reachedRow = square.rowIndex < row;
    return reachedRow ? (square.visibilityChance === 1 ? 1 : 0) : 1;
  });

  return (
    <motion.div
      className="relative col-span-1 aspect-square"
      style={{
        backgroundColor: `hsl(${square.color.h}deg, ${square.color.s}%, ${square.color.l}%)`,
        opacity,
      }}
    />
  );
}
