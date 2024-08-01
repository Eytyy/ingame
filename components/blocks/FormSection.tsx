"use client";

import { useScroll } from "framer-motion";
import { IFormSection } from "@/types";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import ImageBlock from "./ImageBlock";
import TextBlockWrapper, {
  AnimatedTextCells,
  TextBlock,
  TextCells,
} from "./TextBlock";

export default function FormSection({
  block,
  first,
}: {
  block: IFormSection;
  first: boolean;
}) {
  const { image, heading, description } = block;

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
          layout="contentImage"
          scrollYProgress={scrollYProgress}
        />
        <TextBlockWrapper layout="contentImage">
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
