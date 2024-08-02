import { IStatBlock } from "@/types";
import React from "react";

export default function StatBlock({
  description,
  format,
  stat,
  color,
}: IStatBlock) {
  return (
    <>
      <p
        className="text-[3vw] font-bold"
        style={{
          color: color.hex,
        }}
      >
        {stat}
        {format}
      </p>
      <p>{description}</p>
    </>
  );
}
