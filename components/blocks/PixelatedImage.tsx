import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import React from "react";
import usePixelate from "@/hooks/usePixelate";
import { useAppContext } from "@/context/AppContext";

export default function PixelatedImage({
  image,
  imageWrapperDimensions,
  scrollYProgress,
  first,
}: {
  image: HTMLImageElement;
  imageWrapperDimensions: { w: number; h: number };
  scrollYProgress: MotionValue<number>;
  first: boolean;
}) {
  const { noOfRows } = useAppContext();

  const squares = usePixelate({
    image,
    dimensions: imageWrapperDimensions,
  });

  const [cellsInView, setCellsInView] = React.useState(
    first ? 0 : squares.length,
  );

  const noOfCells = useTransform(
    scrollYProgress,
    first ? [0, 0.333] : [0],
    first ? [0, squares.length] : [squares.length],
  );

  useMotionValueEvent(noOfCells, "change", (latest) => {
    const no = Math.round(latest);
    setCellsInView(no);
  });

  const rowProgress = useTransform(
    scrollYProgress,
    first ? [0.333, 0.666] : [0, 0.5],
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

function ImageSquare({
  square,
  rowProgress,
}: {
  square: ReturnType<typeof usePixelate>[0];
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
