import { IStatBlock } from "@/types";
import React from "react";

export default function StatBlock({ description, format, stat }: IStatBlock) {
  return (
    <>
      <p className="text-[3vw] font-bold">
        {stat}
        {format}
      </p>
      <p>{description}</p>
    </>
  );
}
