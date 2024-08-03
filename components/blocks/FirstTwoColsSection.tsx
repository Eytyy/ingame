"use client";

import { useScroll } from "framer-motion";
import { ITwoColSection } from "@/types";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import FirstImageBlock from "./FirstImageBlock";
import { AnimatedTextBlock } from "./AnimatedTextBlock";
import { cn } from "@/lib/utils";

export const FirstTwoColsSection = React.forwardRef<
  HTMLDivElement,
  {
    block: ITwoColSection;
  }
>(({ block }, ref) => {
  const { image, heading, description, layout } = block;

  const { cellW } = useAppContext();

  const spacerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: [`${cellW}px end`, `end ${cellW}px`],
  });

  return (
    <div>
      <div className="sticky top-0 pt-[calc(var(--cellW)*2)] text-white lg:pt-[var(--cellW)]">
        <div className="hello lg:grid lg:grid-cols-12" ref={ref}>
          <FirstImageBlock
            image={image}
            layout={layout}
            scrollYProgress={scrollYProgress}
          />
          <div
            className={cn(
              "relative",
              "col-span-5 row-start-1",
              layout === "contentImage" ? "col-start-1" : "col-start-8",
            )}
          >
            <AnimatedTextBlock
              heading={heading}
              description={description}
              scrollYProgress={scrollYProgress}
            />
          </div>
        </div>
      </div>
      <div ref={spacerRef} className="h-[150vh]" />
    </div>
  );
});

FirstTwoColsSection.displayName = "FirstTwoColsSection";
