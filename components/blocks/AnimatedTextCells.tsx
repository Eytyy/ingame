import { MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import React from "react";

export default function AnimatedTextCells({
  scrollYProgress,
  blockId,
  rows,
}: {
  scrollYProgress: MotionValue;
  blockId: string;
  rows: number;
}) {
  const cols = 5;
  let cells = rows ? Array.from({ length: cols * rows }, (_, i) => i) : [];

  const [cellsInView, setCellsInView] = React.useState(0);
  const noOfCells = useTransform(scrollYProgress, [0, 0.25], [0, cells.length]);

  useMotionValueEvent(noOfCells, "change", (latest) => {
    const no = Math.round(latest);
    setCellsInView(no);
  });

  useMotionValueEvent(noOfCells, "change", (latest) => {
    const no = Math.round(latest);
    setCellsInView(no);
  });

  const cellsToRender = cells.slice(0, cellsInView);

  return (
    <div className="absolute inset-0 grid grid-cols-5 content-start">
      {cellsToRender.map((cell, index) => (
        <Cell key={`${blockId}-imageCell-${index}`} />
      ))}
    </div>
  );
}

function Cell() {
  return (
    <div className="col-span-1 aspect-square overflow-hidden">
      <div className="h-full w-full bg-black" />
    </div>
  );
}
