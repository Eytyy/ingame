import { defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
    }),
    defineField({
      title: "Content",
      name: "content",
      type: "array",
      of: [
        { type: "block.twoColSection" },
        { type: "block.statsSection" },
        { type: "block.formSection" },
      ],
    }),
  ],
});
