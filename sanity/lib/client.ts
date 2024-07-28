import { createClient } from "next-sanity";

import {
  apiVersion,
  dataset,
  projectId,
  revalidateSecret,
  studioUrl,
} from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: revalidateSecret ? false : true,
  perspective: "published",
  stega: {
    studioUrl,
    logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === "title") {
        return true;
      }
      return props.filterDefault(props);
    },
  },
});
