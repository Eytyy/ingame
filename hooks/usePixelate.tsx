import React, { useRef } from "react";

type Props = {
  noOfCells: number;
};

function getRandomIndex(max: number) {
  return Math.floor(Math.random() * max);
}

export default function usePixelate({ noOfCells }: Props) {
  const cells = useRef<number[]>(
    Array.from({ length: noOfCells }, (_, i) => i),
  );
  const [toPaint, setToPaint] = React.useState<number[]>([]);

  // save interval id in ref
  const interval = React.useRef<number | null>(null);

  // run interval on mount to paint cells randomly
  // when getting a cell from cells, remove it from cells and add it to toPaint
  React.useEffect(() => {
    function updateCellsToPaint() {
      const randomIdx = getRandomIndex(cells.current.length);
      const cell = cells.current[randomIdx];
      cells.current = [
        ...cells.current.slice(0, randomIdx),
        ...cells.current.slice(randomIdx + 1),
      ];
      setToPaint([...toPaint, cell]);
    }

    interval.current = window.setInterval(() => {
      if (cells.current.length === 0) {
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
  }, [toPaint]);

  return toPaint;
}
