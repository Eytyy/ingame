import { defineField, defineType } from "sanity";
import { FaCog } from "react-icons/fa";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: FaCog,
  preview: {
    prepare: () => ({
      title: "Settings",
    }),
  },
  groups: [
    {
      title: "Menu",
      name: "menu",
      default: true,
    },
    {
      title: "Footer",
      name: "footer",
    },
    {
      title: "SEO & Social Sharing",
      name: "seo",
    },
    {
      title: "Translations",
      name: "translations",
    },
  ],
  fields: [
    defineField({
      title: "Menu",
      name: "menu",
      type: "array",
      of: [{ type: "anchorLink" }],
      group: "menu",
    }),
    defineField({
      name: "seoTitle",
      description:
        "This field is the title of your website. It is used for the <title> tag for SEO.",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      description: "Used both for the <meta> description tag for SEO.",
      title: "Description",
      type: "text",
      validation: (rule) => rule.max(155).required(),
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      description:
        "Used for social media previews when linking to the website.",
      type: "image",
      group: "seo",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "array",
      group: "footer",
      of: [{ type: "location" }],
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "array",
      group: "footer",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      of: [{ type: "partner" }],
      group: "footer",
    }),
  ],
});
