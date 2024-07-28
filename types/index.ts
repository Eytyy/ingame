import type { Image } from "sanity";

export interface HomePagePayload {
  image: Image & {
    lqip: string;
    width: number;
    height: number;
  };
  content: Array<ITwoColSection | IStatsSection>;
}

export interface ITwoColSection {
  _type: "block.twoColSection";
  _key: string;
  layout: "contentImage" | "imageContent";
  heading: string;
  description: string;
  image: Image;
}

export interface IStatsSection {
  _type: "block.statsSection";
  _key: string;
  noOfItemsPerRow: 1 | 2 | 3;
  stats: Array<IStatBlock>;
}

export interface IStatBlock {
  _type: "block.statBlock";
  _key: string;
  stat: number;
  format: string;
  description: string;
}
