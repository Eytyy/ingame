import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: Image) => {
  return imageBuilder
    ?.image(source)
    .auto("format")
    .fit("crop")
    .crop("focalpoint");
};

export function urlForOpenGraphImage(image: Image | undefined) {
  if (!image) {
    return "";
  }
  return urlForImage(image)?.width(1200).height(627).fit("crop").url();
}
