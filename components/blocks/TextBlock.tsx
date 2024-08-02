"use client";

import { motion, useInView } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";
import { containerVariants, pVariants } from "./text.animations";

interface ITextBlock {
  heading: string;
  description: string;
}

export function TextBlock({ heading, description }: ITextBlock) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: "all",
  });
  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative col-span-3 col-start-2 space-y-8 p-[var(--cellW)]",
        "lg:p-[calc(var(--cellW)*0.5)] lg:pr-[var(--cellW)]",
      )}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.p
        className="font-sans text-3xl font-bold uppercase leading-[1.2] lg:text-[2vw]"
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
  );
}
