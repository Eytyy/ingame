"use client";

import { useScroll } from "framer-motion";
import { ITwoColSection } from "@/types";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import FirstImageBlock from "./FirstImageBlock";
import { AnimatedTextBlock } from "./AnimatedTextBlock";
import { cn } from "@/lib/utils";
export default function FirstTwoColsSection({
  block,
}: {
  block: ITwoColSection;
}) {
  const { image, heading, description, layout } = block;

  const { cellW } = useAppContext();

  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${cellW}px end`, `end ${cellW}px`],
  });

  return (
    <div>
      <div className="sticky top-0 pt-[var(--cellW)] text-white lg:grid lg:grid-cols-12">
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
      <div ref={ref} className={"h-[150vh]"} />
    </div>
  );
}
