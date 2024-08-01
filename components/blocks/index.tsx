import { HomePagePayload } from "@/types";
import React from "react";
import TwoColsSection from "./TwoColsSection";
import StatsSection from "./StatsSection";
import FormSection from "./FormSection";

type Props = {
  block: HomePagePayload["content"][number];
  index: number;
};

export default function Block({ block, index }: Props) {
  switch (block._type) {
    case "block.twoColSection":
      return <TwoColsSection block={block} first={index == 0} />;
    case "block.statsSection":
      return <StatsSection block={block} />;
    case "block.formSection":
      return <FormSection block={block} first={index == 0} />;
    default:
      return null;
  }
}
