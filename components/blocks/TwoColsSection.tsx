"use client";

import { motion, useMotionValue } from "framer-motion";
import { ITwoColSection } from "@/types";
import React from "react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";

export default function TwoColsSection({ block }: { block: ITwoColSection }) {
  const { image, heading, description, layout } = block;

  const { cellW, noOfCols, noOfRows } = useAppContext();

  const imageWrapperHeight = useMotionValue("100vh");
  const textWrapperHeight = useMotionValue("100vh");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // update imageWrapperHeight
      const imageOffset = cellW;

      // set imageWrapperHeight as css variable
      document.documentElement.style.setProperty(
        "--imageWrapperHeight",
        `${window.innerHeight - imageOffset}px`,
      );

      // update textWrapperHeight
      const totalHeight = cellW * noOfRows;
      const excessHeight = Math.abs(window.innerHeight - totalHeight);
      const textOffset = cellW * 2;

      // set textWrapperHeight as css variable
      document.documentElement.style.setProperty(
        "--textWrapperHeight",
        `${window.innerHeight - textOffset - excessHeight}px`,
      );
    }
  }, [cellW, noOfCols, noOfRows, imageWrapperHeight, textWrapperHeight]);

  return (
    <motion.section className="py-[var(--cellW)] text-white lg:grid lg:grid-cols-12">
      <ImageBlock image={image} layout={layout} />
      <TextBlock heading={heading} description={description} layout={layout} />
    </motion.section>
  );
}

function ImageBlock({
  image,
  layout,
}: Pick<ITwoColSection, "image" | "layout">) {
  return (
    <motion.div
      className={cn(
        "aspect-square lg:aspect-auto lg:h-[var(--imageWrapperHeight)]",
        "col-span-7 row-start-1 bg-[pink]",
        layout === "contentImage" ? "col-start-6" : "col-start-1",
      )}
    ></motion.div>
  );
}

function TextBlock({
  heading,
  description,
  layout,
}: Pick<ITwoColSection, "heading" | "description" | "layout">) {
  return (
    <motion.div
      className={cn(
        "lg:grid lg:h-[var(--textWrapperHeight)] lg:grid-cols-5 lg:p-0",
        "col-span-5 row-start-1 bg-black p-[var(--cellW)]",
        layout === "contentImage" ? "col-start-1" : "col-start-8",
      )}
    >
      <div className="col-span-3 col-start-2 space-y-8 lg:pt-[calc(100vw/12)]">
        <p className="font-sans text-3xl font-bold uppercase leading-[1.2] lg:text-[1.5vw]">
          {heading}
        </p>
        <p>{description}</p>
      </div>
    </motion.div>
  );
}
