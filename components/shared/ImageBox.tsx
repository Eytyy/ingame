import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

interface ImageBoxProps {
  image?: { asset?: any };
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  classWrapper?: string;
  "data-sanity"?: string;
  blurDataURL?: string;
}

export default function ImageBox({
  image,
  alt = "Cover Image",
  width = 3500,
  height = 2000,
  sizes = "100vw",
  classWrapper,
  ...props
}: ImageBoxProps) {
  const imageUrl =
    image && urlForImage(image).width(width).height(height).fit("crop").url();
  return (
    <div className={cn("w-full overflow-hidden", classWrapper)}>
      {imageUrl && (
        <Image
          className="absolute h-full w-full"
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          src={imageUrl}
          placeholder={props.blurDataURL ? "blur" : "empty"}
          blurDataURL={props.blurDataURL}
        />
      )}
    </div>
  );
}
