"use client";

import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { ITwoColSection } from "@/types";
import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";

export default function TextBlockWrapper({
  children,
  layout,
}: PropsWithChildren<{
  layout: ITwoColSection["layout"];
}>) {
  return (
    <motion.div
      className={cn(
        "relative",
        "col-span-5 row-start-1",
        layout === "contentImage" ? "col-start-1" : "col-start-8",
      )}
    >
      {children}
    </motion.div>
  );
}

interface ITextBlock {
  heading: string;
  description: string;
  scrollYProgress: MotionValue;
  first: boolean;
}

export function TextBlock({
  heading,
  description,
  scrollYProgress,
}: ITextBlock) {
  const [showText, setShowText] = React.useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.25) {
      setShowText(true);
    } else {
      setShowText(false);
    }
  });

  return (
    <motion.div
      className={cn(
        "relative col-span-3 col-start-2 space-y-8 p-[calc(var(--cellW)*0.5)] pr-[var(--cellW)]",
      )}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2, ease: "easeInOut" } },
      }}
      initial="hidden"
      animate={showText ? "visible" : "hidden"}
    >
      <motion.p
        className="font-sans text-3xl font-bold uppercase leading-[1.2] lg:text-[2vw]"
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        {heading}
      </motion.p>
      <motion.p
        className="font-sans text-lg leading-[1.5] lg:text-xl"
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export function TextCells({ blockId }: { blockId: string }) {
  const { noOfRows } = useAppContext();
  let cells = Array.from({ length: 5 * (noOfRows - 2) }, (_, i) => i);

  return (
    <div className="absolute inset-0 grid grid-cols-5 content-start">
      {cells.map((cell, index) => (
        <Cell key={`${blockId}-imageCell-${index}`} />
      ))}
    </div>
  );
}

export function AnimatedTextCells({
  scrollYProgress,
  blockId,
}: {
  scrollYProgress: MotionValue;
  blockId: string;
}) {
  const { noOfRows } = useAppContext();
  let cells = Array.from({ length: 5 * (noOfRows - 2) }, (_, i) => i);

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
