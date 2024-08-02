import { defineField, defineType } from "sanity";

export default defineType({
  name: "block.statBlock",
  type: "object",
  fields: [
    defineField({
      name: "stat",
      title: "Stat",
      type: "number",
    }),
    defineField({
      name: "format",
      title: "Number Format",
      type: "string",
      description: "E.g. M, B, %, etc.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "color",
    }),
  ],
  preview: {
    select: {
      stat: "stat",
      format: "format",
      description: "description",
    },
    prepare({ stat, format, description }) {
      return {
        title: `${stat} ${format}`,
        subtitle: description,
      };
    },
  },
});
