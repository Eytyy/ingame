import { defineField, defineType } from "sanity";

export default defineType({
  name: "block.statsSection",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
    }),
    defineField({
      name: "noOfItemsPerRow",
      title: "No of Items Per Row",
      type: "number",
      options: {
        list: [1, 2, 3],
      },
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{ type: "block.statBlock" }],
    }),
  ],
  preview: {
    select: {
      noOfItemsPerRow: "noOfItemsPerRow",
      stats: "stats",
    },
    prepare({ noOfItemsPerRow, stats }) {
      return {
        title: `Stats Section (${noOfItemsPerRow} items per row)`,
        subtitle: `${stats.length} stats`,
      };
    },
  },
});
