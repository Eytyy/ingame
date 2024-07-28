"use client";

import { useMotionValue } from "framer-motion";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export const AppContext = createContext(
  {} as {
    noOfCols: number;
    noOfRows: number;
    cellW: number;
    backgroundImage: string | null;
    updateBG: (url: string) => void;
  },
);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState({
    noOfCols: 12,
    noOfRows: 0,
    cellW: 0,
  });
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      let noOfRow = Math.ceil(
        (window.innerHeight / window.innerWidth) * state.noOfCols,
      );
      let cellWidth = window.innerWidth / state.noOfCols;
      setState({
        ...state,
        noOfRows: noOfRow,
        cellW: cellWidth,
      });
      // set cellW as css variable
      document.documentElement.style.setProperty("--cellW", `${cellWidth}px`);
    }
  }, []);

  const updateBG = React.useCallback((url: string) => {
    setBackgroundImage(url);
  }, []);

  return (
    <AppContext.Provider
      value={{
        noOfCols: state.noOfCols,
        noOfRows: state.noOfRows,
        cellW: state.cellW,
        backgroundImage,
        updateBG,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
