import { defineType } from "sanity";

export default defineType({
  name: "anchorLink",
  title: "Anchor Link",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "blockId",
      title: "Block ID",
      type: "string",
    },
  ],
});
