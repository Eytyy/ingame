"use client";

import { motion } from "framer-motion";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { drawPixilatedImage, ISquare } from "@/lib/canvas.utils";

export function PixelatedImage({ image }: { image: HTMLImageElement }) {
  const { cellW, windowHeight } = useAppContext();

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
