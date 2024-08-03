"use client";

import { motion, MotionValue, useMotionValueEvent } from "framer-motion";
import React from "react";
import useTextWrapperBounds from "@/hooks/useTextWrapperBounds";
import AnimatedTextCells from "./AnimatedTextCells";
import { containerVariants, pVariants } from "./text.animations";
import { cn } from "@/lib/utils";

interface ITextBlock {
  heading: string;
  description: string;
  scrollYProgress: MotionValue<number>;
}

export function AnimatedTextBlock({
  heading,
  description,
  scrollYProgress,
}: ITextBlock) {
  const [showText, setShowText] = React.useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) =>
    setShowText(latest >= 0.25),
  );
  const { ref, bounds } = useTextWrapperBounds();

  return (
    <div className="col-span-3 col-start-2">
      <motion.div
        ref={ref}
        className={cn(
          "relative z-10 space-y-8 p-[var(--cellW)]",
          "lg:p-[calc(var(--cellW)*0.5)] lg:pr-[var(--cellW)]",
        )}
        variants={containerVariants}
        initial="hidden"
        animate={showText ? "visible" : "hidden"}
      >
        <motion.p
          className="font-sans text-2xl font-bold uppercase leading-[1.2] lg:text-[2vw]"
          variants={pVariants}
        >
          {heading}
        </motion.p>
        <motion.p
          className="font-sans text-lg leading-[1.5] lg:text-xl"
          variants={pVariants}
        >
          {description}
        </motion.p>
      </motion.div>
      <AnimatedTextCells
        scrollYProgress={scrollYProgress}
        blockId="animatedTextBlock"
        rows={bounds.rows}
      />
    </div>
  );
}
