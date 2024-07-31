import { motion, MotionValue, useTransform } from "framer-motion";
import { ImageProps, ITwoColSection } from "@/types";
import React from "react";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { cn } from "@/lib/utils";
import PixelatedImage from "./PixelatedImage";

export default function ImageBlock({
  image,
  layout,
  scrollYProgress,
  imageWrapperDimensions,
  first,
}: {
  image: ImageProps;
  layout: ITwoColSection["layout"];
  scrollYProgress: MotionValue;
  imageWrapperDimensions: { w: number; h: number };
  first: boolean;
}) {
  const [loadedImage, setLoadedImage] = React.useState<HTMLImageElement | null>(
    null,
  );
  const width = Math.min(Math.min(image.width, image.height), 1000);
  const imageURL = urlForImage(image).width(width).height(width).url();

  const imageOpacity = useTransform(scrollYProgress, [0.333, 0.5], [0, 1]);

  return (
    <div
      className={cn(
        "relative",
        "grid aspect-square grid-cols-7 overflow-hidden lg:aspect-auto lg:h-[var(--imageWrapperHeight)]",
        "col-span-7 row-start-1 auto-rows-min",
        layout === "contentImage" ? "col-start-6" : "col-start-1",
      )}
    >
      <motion.div
        className="absolute inset-0"
        style={{ opacity: first ? imageOpacity : 1 }}
      >
        <Image
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
      {loadedImage ? (
        <PixelatedImage
          first={first}
          scrollYProgress={scrollYProgress}
          image={loadedImage}
          imageWrapperDimensions={imageWrapperDimensions}
        />
      ) : null}
    </div>
  );
}
