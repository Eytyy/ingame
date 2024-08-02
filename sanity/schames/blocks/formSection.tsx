import { defineField, defineType } from "sanity";

export default defineType({
  name: "block.formSection",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "text",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "image",
    },
  },
});
