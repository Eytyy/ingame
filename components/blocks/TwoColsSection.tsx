"use client";

import { ITwoColSection } from "@/types";
import React from "react";
import ImageBlock from "./ImageBlock";
import { TextBlock } from "./TextBlock";
import TextBlockWrapper from "./TextBlockWrapper";

export default function TwoColsSection({ block }: { block: ITwoColSection }) {
  const { image, heading, description, layout } = block;

  return (
    <div>
      <div className="sticky top-0 text-white lg:grid lg:grid-cols-12">
        <ImageBlock image={image} layout={layout} />
        <TextBlockWrapper layout={layout}>
          <TextBlock heading={heading} description={description} />
        </TextBlockWrapper>
      </div>
    </div>
  );
}
