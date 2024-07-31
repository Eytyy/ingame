"use client";

import { useScroll } from "framer-motion";
import { ITwoColSection } from "@/types";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import ImageBlock from "./ImageBlock";
import TextBlock from "./TextBlock";
import { cn } from "@/lib/utils";

export default function TwoColsSection({
  block,
  first,
}: {
  block: ITwoColSection;
  first: boolean;
}) {
  const { image, heading, description, layout } = block;

  const { cellW, noOfCols, noOfRows, backgroundImage } = useAppContext();
  const [imageWrapperDimensions, setImageWrapperDimensions] = React.useState({
    w: 0,
    h: 0,
  });

  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${cellW}px end`, `end ${cellW}px`],
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // update imageWrapperHeight
      const imageOffset = cellW;

      // set imageWrapperHeight as css variable
      document.documentElement.style.setProperty(
        "--imageWrapperHeight",
        `${window.innerHeight - imageOffset}px`,
      );

      setImageWrapperDimensions({
        w: cellW * 7,
        h: window.innerHeight - imageOffset,
      });

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
  }, [cellW, noOfCols, noOfRows]);

  return (
    <div>
      <div
        className="sticky top-[var(--cellW)] text-white lg:grid lg:grid-cols-12"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "",
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
        }}
      >
        <ImageBlock
          first={first}
          image={image}
          layout={layout}
          scrollYProgress={scrollYProgress}
          imageWrapperDimensions={imageWrapperDimensions}
        />
        <TextBlock
          heading={heading}
          description={description}
          layout={layout}
          scrollYProgress={scrollYProgress}
          blockId={block._key}
        />
      </div>
      <div ref={ref} className={cn(first ? "h-[150vh]" : "h-[100vh]")}></div>
    </div>
  );
}
