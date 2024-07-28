import { defineField, defineType } from "sanity";

export default defineType({
  name: "block.twoColSection",
  type: "object",
  fields: [
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Content | Image", value: "contentImage" },
          { title: "Image | Content", value: "imageContent" },
        ],
      },
      initialValue: "imageContent",
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
