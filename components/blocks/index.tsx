import { HomePagePayload } from "@/types";
import React from "react";
import TwoColsSection from "./TwoColsSection";
import StatsSection from "./StatsSection";
import { MotionValue } from "framer-motion";
type Props = HomePagePayload["content"][number];

export default function Block(block: Props) {
  switch (block._type) {
    case "block.twoColSection":
      return <TwoColsSection block={block} />;
    case "block.statsSection":
      return <StatsSection block={block} />;
    default:
      return null;
  }
}
