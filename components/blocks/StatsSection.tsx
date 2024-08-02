import { IStatsSection } from "@/types";
import React, { PropsWithChildren } from "react";
import StatBlock from "./StatBlock";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export default function StatsSection({ block }: { block: IStatsSection }) {
  const { stats, noOfItemsPerRow } = block;
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="relative grid grid-cols-12 lg:py-[var(--cellW)]">
      <div
        className={cn(
          "space-y-[var(--cellW)] lg:col-span-9 lg:col-start-3 lg:grid lg:grid-cols-9 lg:space-y-0",
          "col-span-9 col-start-2 space-y-[var(--cellW)] lg:grid lg:grid-cols-9 lg:space-y-0",
        )}
      >
        {stats.map((stat) => (
          <StatWrapper
            inView={inView}
            key={stat._key}
            index={stats.indexOf(stat)}
            noOfItemsPerRow={noOfItemsPerRow}
          >
            <StatBlock {...stat} />
          </StatWrapper>
        ))}
      </div>
    </div>
  );
}

function StatWrapper({
  children,
  index,
  noOfItemsPerRow,
  inView,
}: PropsWithChildren<{
  index: number;
  noOfItemsPerRow: 1 | 2 | 3;
  inView: boolean;
}>) {
  // each item is 2 columns wide, with a 1 column gap
  const colStart = 1 + (index % noOfItemsPerRow) * 3;
  let cells = Array.from({ length: 2 * 2 }, (_, i) => i);

  return (
    <div
      className="relative aspect-square"
      style={{
        gridColumnStart: colStart,
        gridColumnEnd: `span 2`,
      }}
    >
      <div className="absolute inset-0 grid grid-cols-2">
        {cells.map((cell, index) => (
          <div key={index} className="bg-black lg:aspect-square" />
        ))}
      </div>
      {inView ? (
        <div className="relative bg-black p-8 lg:aspect-square">{children}</div>
      ) : null}
    </div>
  );
}
