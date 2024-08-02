import { HomePagePayload } from "@/types";
import React from "react";
import TwoColsSection from "./TwoColsSection";
import StatsSection from "./StatsSection";
import FormSection from "./FormSection";

type Props = {
  block: HomePagePayload["content"][number];
};

export default function Block({ block }: Props) {
  switch (block._type) {
    case "block.twoColSection":
      return <TwoColsSection block={block} />;
    case "block.statsSection":
      return <StatsSection block={block} />;
    case "block.formSection":
      return <FormSection block={block} />;
    default:
      return null;
  }
}
