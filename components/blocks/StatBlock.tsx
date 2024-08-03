import { IStatBlock } from "@/types";
import React from "react";
import Counter from "../shared/Counter";

export default function StatBlock({
  description,
  format,
  stat,
  color,
}: IStatBlock) {
  return (
    <>
      <p
        className="text-[10vw] font-bold md:text-[5vw] lg:text-[3vw]"
        style={{
          color: color.hex,
        }}
      >
        <Counter value={stat} />
        {format}
      </p>
      <p className="text-[5vw] leading-[1.3] md:text-base lg:text-[1.5vw] xl:text-lg">
        {description}
      </p>
    </>
  );
}
