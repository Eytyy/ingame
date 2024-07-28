import { IStatsSection } from "@/types";
import React, { PropsWithChildren } from "react";
import StatBlock from "./StatBlock";

export default function StatsSection({ block }: { block: IStatsSection }) {
  const { stats, noOfItemsPerRow } = block;
  return (
    <div className="lg:grid lg:grid-cols-12 lg:py-[var(--cellW)]">
      <div className="col-span-9 col-start-3 space-y-[var(--cellW)] lg:grid lg:grid-cols-9 lg:space-y-0">
        {stats.map((stat) => (
          <StatWrapper
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
}: PropsWithChildren<{
  index: number;
  noOfItemsPerRow: 1 | 2 | 3;
}>) {
  // each item is 2 columns wide, with a 1 column gap
  const colStart = 1 + (index % noOfItemsPerRow) * 3;
  return (
    <div
      style={{
        gridColumnStart: colStart,
        gridColumnEnd: `span 2`,
      }}
    >
      <div className="bg-black p-8 lg:aspect-square">{children}</div>
    </div>
  );
}
