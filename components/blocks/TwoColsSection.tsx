"use client";

import { useScroll } from "framer-motion";
import { ITwoColSection } from "@/types";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import ImageBlock from "./ImageBlock";
import TextBlockWrapper, {
  AnimatedTextCells,
  TextBlock,
  TextCells,
} from "./TextBlock";

export default function TwoColsSection({
  block,
  first,
}: {
  block: ITwoColSection;
  first: boolean;
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
        <ImageBlock
          first={first}
          image={image}
          layout={layout}
          scrollYProgress={scrollYProgress}
        />
        <TextBlockWrapper layout={layout}>
          {first ? (
            <AnimatedTextCells
              scrollYProgress={scrollYProgress}
              blockId={block._key}
            />
          ) : (
            <TextCells blockId={block._key} />
          )}
          <TextBlock
            heading={heading}
            description={description}
            scrollYProgress={scrollYProgress}
            first={first}
          />
        </TextBlockWrapper>
      </div>
      {first ? <div ref={ref} className="h-[150vh]"></div> : null}
    </div>
  );
}
