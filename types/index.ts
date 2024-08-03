import type { Image } from "sanity";
export interface IMenuItem {
  _key: string;
  title: string;
  link: string;
}

export interface SettingsPayload {
  menu: Array<IMenuItem>;
  seo: {
    seoTitle: string;
    seoDescription: string;
    seoImage: ImageProps;
  };
  footer: {
    address: Array<{
      _key: string;
      city: string;
      addressLine: string;
      addressLink: string;
      email: string;
      phone: string;
    }>;
    social: Array<{
      _key: string;
      platform: string;
      link: string;
    }>;
    partners: Array<{
      _key: string;
      name: string;
      logo: {
        url: string;
        width: number;
        height: number;
      };
      url: string;
    }>;
  };
}

export interface HomePagePayload {
  heroTitle: string;
  image: Image & {
    lqip: string;
    width: number;
    height: number;
  };
  content: Array<ITwoColSection | IStatsSection | IFormSection>;
}

export interface IFormSection {
  _type: "block.formSection";
  _key: string;
  heading: string;
  description: string;
  image: ImageProps;
}

export interface ITwoColSection {
  _type: "block.twoColSection";
  _key: string;
  layout: "contentImage" | "imageContent";
  heading: string;
  description: string;
  image: ImageProps;
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
  color: {
    hex: string;
  };
}

export interface ImageProps extends Image {
  width: number;
  height: number;
}
