"use client";

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface IState {
  noOfCols: number;
  noOfRows: number;
  cellW: number;
  cellH: number;
  windowWidth: number;
  windowHeight: number;
  backgroundImage: string | null;
}

const initialState: IState = {
  noOfCols: 12,
  noOfRows: 0,
  cellW: 0,
  cellH: 0,
  windowWidth: 0,
  windowHeight: 0,
  backgroundImage: null,
};

interface IAppContext extends IState {
  updateBG: (url: string) => void;
}

export const AppContext = createContext<IAppContext>({
  ...initialState,
  updateBG: () => {},
});

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<IState>(initialState);

  const setup = React.useCallback(() => {
    if (typeof window !== "undefined") {
      const { innerWidth: w, innerHeight: h } = window;
      let noOfRows = Math.floor((h / w) * 12);
      let cellW = w / 12;
      let cellH = h / noOfRows;
      setState((state) => ({
        ...state,
        noOfRows,
        cellW,
        cellH,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      }));
      // set cellW as css variable
      document.documentElement.style.setProperty("--cellW", `${cellW}px`);
      document.documentElement.style.setProperty("--cellH", `${cellH}px`);

      const offset = cellW;
      document.documentElement.style.setProperty(
        "--imageWrapperHeight",
        `${h - offset}px`,
      );
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setup();
      window.addEventListener("resize", setup);
    }
    return () => {
      window.removeEventListener("resize", setup);
    };
  }, [setup]);

  const updateBG = React.useCallback((url: string) => {
    setState((state) => ({ ...state, backgroundImage: url }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
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
