import { IStatsSection } from "@/types";
import React, { PropsWithChildren } from "react";
import StatBlock from "./StatBlock";
import {
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useAppContext } from "@/context/AppContext";

export default function StatsSection({ block }: { block: IStatsSection }) {
  const { cellW, backgroundImage } = useAppContext();

  const { stats, noOfItemsPerRow } = block;
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start end`, `end ${cellW}px`],
  });
  return (
    <div>
      <div
        className="sticky top-[var(--cellW)] lg:grid lg:grid-cols-12 lg:py-[var(--cellW)]"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "",
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="col-span-9 col-start-3 space-y-[var(--cellW)] lg:grid lg:grid-cols-9 lg:space-y-0">
          {stats.map((stat) => (
            <StatWrapper
              scrollYProgress={scrollYProgress}
              key={stat._key}
              index={stats.indexOf(stat)}
              noOfItemsPerRow={noOfItemsPerRow}
            >
              <StatBlock {...stat} />
            </StatWrapper>
          ))}
        </div>
      </div>
      <div ref={ref} className="h-screen" />
    </div>
  );
}

function StatWrapper({
  children,
  index,
  noOfItemsPerRow,
  scrollYProgress,
}: PropsWithChildren<{
  index: number;
  noOfItemsPerRow: 1 | 2 | 3;
  scrollYProgress: MotionValue;
}>) {
  // each item is 2 columns wide, with a 1 column gap
  const colStart = 1 + (index % noOfItemsPerRow) * 3;
  let cells = Array.from({ length: 2 * 2 }, (_, i) => i);
  const noOfCells = useTransform(scrollYProgress, [0, 0.25], [0, cells.length]);

  const [cellsInView, setCellsInView] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  useMotionValueEvent(noOfCells, "change", (latest) => {
    const no = Math.round(latest);
    setCellsInView(no);
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.25 && latest < 0.8) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const cellsToRender = cells.slice(0, cellsInView);
  return (
    <div
      className="relative aspect-square"
      style={{
        gridColumnStart: colStart,
        gridColumnEnd: `span 2`,
      }}
    >
      <div className="absolute inset-0 grid grid-cols-2">
        {cellsToRender.map((cell, index) => (
          <div key={index} className="bg-black lg:aspect-square" />
        ))}
      </div>
      {visible ? (
        <div className="relative bg-black p-8 lg:aspect-square">{children}</div>
      ) : null}
    </div>
  );
}
