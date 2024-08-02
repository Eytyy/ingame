"use client";

import { useAppContext } from "@/context/AppContext";
import React from "react";

export default function useTextWrapperBounds() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { cellW } = useAppContext();
  const [bounds, setBounds] = React.useState({
    height: 0,
    rows: 0,
  });

  React.useEffect(() => {
    if (ref.current !== null && cellW) {
      const h = ref.current.getBoundingClientRect().height;
      const rows = h / cellW;
      const totalHeight = rows % 1 === 0 ? h : cellW * (Math.floor(rows) + 1);
      setBounds({
        height: totalHeight,
        rows: rows % 1 === 0 ? rows : Math.floor(rows) + 1,
      });
    }
  }, [cellW]);

  return { bounds, ref };
}
