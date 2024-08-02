import { defineField, defineType } from "sanity";

export default defineType({
  name: "location",
  title: "Location",
  type: "object",
  fields: [
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "addressLine",
      title: "Address Line",
      type: "string",
    }),
    defineField({
      name: "addressLink",
      title: "Address Link",
      type: "url",
      description: "Link to Google Maps",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
  ],
});
