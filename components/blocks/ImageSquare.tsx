import { ISquare } from "@/lib/canvas.utils";
import { motion, MotionValue, useTransform } from "framer-motion";

export default function ImageSquare({
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
