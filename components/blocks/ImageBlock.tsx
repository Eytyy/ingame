import { motion } from "framer-motion";
import { ImageProps, ITwoColSection } from "@/types";
import React from "react";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PixelatedImage } from "./PixelatedImage";

export default function ImageBlock({
  image,
  layout,
}: {
  image: ImageProps;
  layout: ITwoColSection["layout"];
}) {
  const [loadedImage, setLoadedImage] = React.useState<HTMLImageElement | null>(
    null,
  );
  const width = Math.min(Math.min(image.width, image.height), 1000);
  const imageURL = urlForImage(image).width(width).height(width).url();

  return (
    <div
      className={cn(
        "relative",
        "grid aspect-square grid-cols-12 overflow-hidden lg:grid-cols-7",
        "lg:cols-7 lg:aspect-auto lg:h-[var(--imageWrapperHeight)]",
        "col-span-7 row-start-1 auto-rows-min",
        layout === "contentImage" ? "col-start-6" : "col-start-1",
      )}
    >
      <motion.div className="absolute inset-0">
        <Image
          className="object-cover"
          src={imageURL}
          alt="cover image"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          onLoad={(event) => {
            const img = event.target as HTMLImageElement;
            setLoadedImage(img);
          }}
        />
      </motion.div>
      {loadedImage ? <PixelatedImage image={loadedImage} /> : null}
    </div>
  );
}
