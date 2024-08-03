import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "link",
      title: "Link",
      type: "url",
    }),
    defineField({
      name: "platform",
      type: "string",
      title: "Platform",
      options: {
        list: [
          { title: "Facebook", value: "facebook" },
          { title: "Instagram", value: "instagram" },
          { title: "X", value: "x" },
          { title: "Linkedin", value: "linkedin" },
          { title: "Youtube", value: "youtube" },
        ],
        layout: "dropdown",
      },
    }),
  ],
  preview: {
    select: {
      platform: "platform",
      url: "link",
    },
    prepare({ platform, url }: { platform: string; url: string }) {
      return {
        title: url,
        media: getIcon(platform),
      };
    },
  },
});

function getIcon(platform: string) {
  switch (platform) {
    case "facebook":
      return <FaFacebook />;
    case "instagram":
      return <FaInstagram />;
    case "x":
      return <FaXTwitter />;
    case "linkedin":
      return <FaLinkedin />;
    case "youtube":
      return <FaYoutube />;
    default:
      return null;
  }
}
