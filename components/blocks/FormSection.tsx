"use client";

import { IFormSection } from "@/types";
import React from "react";
import ImageBlock from "./ImageBlock";
import { TextBlock } from "./TextBlock";
import Form from "../form";
import TextBlockWrapper from "./TextBlockWrapper";

export default function FormSection({ block }: { block: IFormSection }) {
  const { image, heading, description } = block;

  return (
    <div>
      <div className="sticky top-0 text-white lg:grid lg:grid-cols-12">
        <ImageBlock image={image} layout="contentImage" />
        <TextBlockWrapper layout="contentImage">
          <TextBlock heading={heading} description={description} />
          <Form />
        </TextBlockWrapper>
      </div>
    </div>
  );
}
