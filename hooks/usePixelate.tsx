import React, { useMemo, useRef } from "react";

type Props = {
  noOfCells: number;
};

function getRandomIndex(max: number) {
  return Math.floor(Math.random() * max);
}

export default function usePixelate({ noOfCells }: Props) {
  const [toPaint, setToPaint] = React.useState<number[]>([]);

  // save interval id in ref
  const interval = React.useRef<number | null>(null);

  // run interval on mount to paint cells randomly
  // when getting a cell from cells, remove it from cells and add it to toPaint
  React.useEffect(() => {
    let cells = Array.from({ length: noOfCells }, (_, i) => i);

    function updateCellsToPaint() {
      const randomIdx = getRandomIndex(cells.length);
      const cell = cells[randomIdx];
      cells = [...cells.slice(0, randomIdx), ...cells.slice(randomIdx + 1)];
      setToPaint([...toPaint, cell]);
    }

    interval.current = window.setInterval(() => {
      if (cells.length === 0) {
        clearInterval(interval.current!);
        interval.current = null;
      } else {
        updateCellsToPaint();
      }
    }, 100);

    return () => {
      window.clearInterval(interval.current!);
      interval.current = null;
    };
  }, [toPaint, noOfCells]);

  return toPaint;
}
