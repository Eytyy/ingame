import { IStatsSection } from "@/types";
import React from "react";
import StatBlock from "./StatBlock";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export default function StatsSection({ block }: { block: IStatsSection }) {
  const { stats } = block;
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div
      ref={ref}
      className={cn(
        "relative grid px-[var(--cellW)] py-[var(--cellW)]",
        "lg:grid-cols-12 lg:px-0",
      )}
    >
      <div
        className={cn(
          "space-y-[var(--cellW)]",
          "gap-8 md:grid md:grid-cols-3 md:space-y-0",
          "lg:col-span-8 lg:col-start-3 lg:grid-cols-3 lg:gap-[var(--cellW)]",
        )}
      >
        {stats.map((stat, index) => (
          <div
            className={cn(
              "bg-black p-[var(--cellW)] md:aspect-square",
              "md:col-span-1 md:p-8",
              "lg:col-span-1 lg:p-[calc(var(--cellW)*0.25)]",
            )}
            key={stat._key}
          >
            <StatBlock {...stat} />
          </div>
        ))}
      </div>
    </div>
  );
}
