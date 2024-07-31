"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  Variants,
} from "framer-motion";
import { ITwoColSection } from "@/types";
import React from "react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";
import { Image } from "sanity";
import { urlForImage } from "@/sanity/lib/image";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cellVar: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export default function TwoColsSection({
  block,
  scrollYProgress,
  index,
}: {
  block: ITwoColSection;
  scrollYProgress: MotionValue;
  index: number;
}) {
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
    <div className="sticky top-[var(--cellW)] text-white lg:grid lg:grid-cols-12">
      <ImageBlock
        index={index}
        image={image}
        layout={layout}
        scrollYProgress={scrollYProgress}
        blockId={block._key}
      />
      <TextBlock
        heading={heading}
        description={description}
        layout={layout}
        scrollYProgress={scrollYProgress}
        blockId={block._key}
      />
    </div>
  );
}

function ImageBlock({
  image,
  layout,
  scrollYProgress,
  blockId,
  index,
}: {
  image: Image;
  layout: ITwoColSection["layout"];
  scrollYProgress: MotionValue;
  blockId: string;
  index: number;
}) {
  const { noOfRows, cellW } = useAppContext();
  let cells = Array.from({ length: 7 * (noOfRows - 1) }, (_, i) => i);

  const noOfCells = useTransform(
    scrollYProgress,
    [0, 0.5, 0.65, 1],
    [0, cells.length, cells.length, 0],
  );
  const [cellsInView, setCellsInView] = React.useState(0);

  useMotionValueEvent(noOfCells, "change", (latest) => {
    const no = Math.round(latest);
    setCellsInView(no);
  });

  const cellsToRender = cells.slice(0, cellsInView);
  const imageURL = urlForImage(image).width(1000).height(1000).url();

  return (
    <div
      className={cn(
        "grid aspect-square grid-cols-7 overflow-hidden lg:aspect-auto lg:h-[var(--imageWrapperHeight)]",
        "col-span-7 row-start-1 auto-rows-min",
        layout === "contentImage" ? "col-start-6" : "col-start-1",
      )}
    >
      {cellsToRender.map((cell, index) => (
        <div
          key={`${blockId}-imageCell-${index}`}
          className="col-span-1 aspect-square overflow-hidden"
        >
          <ImageCell index={index} cols={7} image={image} cellW={cellW} />
        </div>
      ))}
    </div>
  );
}

function ImageCell({
  index,
  cols,
  image,
  cellW,
}: {
  cellW: number;
  index: number;
  cols: number;
  image: Image;
}) {
  const col = index % cols;
  const row = Math.floor(index / cols);
  const imageURL = urlForImage(image).width(1000).height(1000).url();
  const x = col * cellW;
  const y = row * cellW;
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundImage: `url(${imageURL})`,
        backgroundSize: "auto",
        backgroundPosition: `-${x}px -${y}px`,
      }}
    />
  );
}

function TextBlock({
  heading,
  description,
  layout,
  scrollYProgress,
  blockId,
}: {
  heading: string;
  description: string;
  layout: ITwoColSection["layout"];
  scrollYProgress: MotionValue;
  blockId: string;
}) {
  const { noOfRows } = useAppContext();
  let cells = Array.from({ length: 5 * (noOfRows - 2) }, (_, i) => i);

  const noOfCells = useTransform(
    scrollYProgress,
    [0, 0.5, 0.65, 1],
    [0, cells.length, cells.length, 0],
  );
  const [cellsInView, setCellsInView] = React.useState(0);

  useMotionValueEvent(noOfCells, "change", (latest) => {
    const no = Math.round(latest);
    setCellsInView(no);
  });

  const cellsToRender = cells.slice(0, cellsInView);

  return (
    <motion.div
      className={cn(
        "lg:grid lg:h-[var(--textWrapperHeight)] lg:grid-cols-5 lg:p-0",
        "col-span-5 row-start-1 content-start p-[var(--cellW)]",
        layout === "contentImage" ? "col-start-1" : "col-start-8",
      )}
    >
      {cellsToRender.map((cell, index) => (
        <div
          key={`${blockId}-imageCell-${index}`}
          className="col-span-1 aspect-square overflow-hidden"
        >
          <div className="h-full w-full bg-black" />
        </div>
      ))}
      {/* <div className="col-span-3 col-start-2 space-y-8 lg:pt-[calc(100vw/12)]">
        <p className="font-sans text-3xl font-bold uppercase leading-[1.2] lg:text-[1.5vw]">
          {heading}
        </p>
        <p>{description}</p>
      </div> */}
    </motion.div>
  );
}
