import { urlForImage } from "@/sanity/lib/image";
import { FaImage } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "partner",
  title: "Partner",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        accept: "image/svg+xml",
      },
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
    prepare({ title, media }) {
      const url = media ? urlForImage(media).url() : null;
      return {
        title,
        media: url ? (
          () => (
            <div className="h-full w-full flex-1 bg-black px-1">
              <img src={url} alt={title} />
            </div>
          )
        ) : (
          <FaImage />
        ),
      };
    },
  },
});
