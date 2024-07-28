import { groq } from "next-sanity";

const imageFields = groq`
  ...,
  ...asset-> {
    'lqip': metadata.lqip,
    'width': metadata.dimensions.width,
    'height': metadata.dimensions.height
  }
`;

export const homePageQuery = groq`
  *[_type == "home"][0] {
    image {
      ${imageFields}
    },
    content[] {
      _type,
      _key,
      _type == "block.twoColSection" => {
        layout,
        heading,
        description,
        image {
          ${imageFields}
        }
      },
      _type == "block.statsSection" => {
        noOfItemsPerRow,
        stats[] {
          _key,
          stat,
          format,
          description
        }
      }
    }
  }
`;
