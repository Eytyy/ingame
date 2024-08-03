import { defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  type: "document",
  fieldsets: [
    {
      name: "hero",
      title: "Hero",
      options: {
        collapsed: false,
      },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      fieldset: "hero",
    }),
    defineField({
      title: "Hero Title",
      name: "heroTitle",
      type: "string",
      fieldset: "hero",
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
