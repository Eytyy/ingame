import { groq } from "next-sanity";

const imageFields = groq`
  ...,
  ...asset-> {
    'lqip': metadata.lqip,
    'width': metadata.dimensions.width,
    'height': metadata.dimensions.height,
  }
`;

export const homePageQuery = groq`
  *[_type == "home"][0] {
    image {
      ${imageFields}
    },
    heroTitle,
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
      _type == "block.formSection" => {
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
          description,
          color {
            hex
          }
        }
      }
    }
  }
`;

export const settingsQuery = groq`
  *[_type == "settings"][0] {
    menu[] {
      _key,
      title,
      link,
    },
    'seo': {
      seoTitle,
      seoDescription,
      ogImage {
        ${imageFields}
      }
    },
    'footer': {
      address[] {
        _key,
        city,
        addressLine,
        addressLink,
        email,
        phone
      },
      social[],
      partners[] {
        _key,
        name,
        "logo": logo {
          ...asset-> {
            'url': url,
            'width': metadata.dimensions.width,
            'height': metadata.dimensions.height,
          }
        },
        url
      }
    }
  }
`;
