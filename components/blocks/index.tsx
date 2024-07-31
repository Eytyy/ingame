import { HomePagePayload } from "@/types";
import React from "react";
import TwoColsSection from "./TwoColsSection";
import StatsSection from "./StatsSection";
import { MotionValue } from "framer-motion";
type Props = {
  block: HomePagePayload["content"][number];
  scrollYProgress: MotionValue;
  index: number;
};

export default function Block({ block, scrollYProgress, index }: Props) {
  switch (block._type) {
    case "block.twoColSection":
      return (
        <TwoColsSection
          block={block}
          scrollYProgress={scrollYProgress}
          index={index}
        />
      );
    case "block.statsSection":
      return <StatsSection block={block} scrollYProgress={scrollYProgress} />;
    default:
      return null;
  }
}
