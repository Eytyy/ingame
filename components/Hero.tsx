"use client";

import React from "react";
import type { Image as ImageProps } from "sanity";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { default as NextImage } from "next/image";
import { rgbToHsl } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";

interface IHero {
  image: ImageProps & {
    lqip: string;
    width: number;
    height: number;
  };
  scrollYProgress: MotionValue;
}

export default function Hero(props: IHero) {
  const [dimensions, setDimensions] = React.useState({ w: 0, h: 0 });
  const [image, setImage] = React.useState<HTMLImageElement | null>(null);
  const refCB = React.useCallback((node: HTMLImageElement) => {
    if (node !== null) {
      setImage(node);
    }
  }, []);

  React.useLayoutEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setDimensions({ w, h });
  }, []);

  return dimensions.w !== 0 && image ? (
    <Canvas
      dimensions={dimensions}
      image={image}
      scrollYProgress={props.scrollYProgress}
    />
  ) : (
    <div className="aspect-video h-screen">
      <NextImage ref={refCB} src="/taxi.webp" alt="Taxi" fill />
    </div>
  );
}

interface ICanvas {
  dimensions: { w: number; h: number };
  image: HTMLImageElement;
  scrollYProgress: MotionValue;
}

function Canvas({ dimensions, image, scrollYProgress }: ICanvas) {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const [ctx, setCTX] = React.useState<CanvasRenderingContext2D | null>(null);
  const pixelationLevel = useTransform(
    scrollYProgress,
    [0, 0.9, 1],
    [120, 12, 12],
  );
  const saturationLevel = useTransform(
    scrollYProgress,
    [0.5, 0.9, 1],
    [1, 0, 0],
  );
  const { updateBG, backgroundImage } = useAppContext();

  const drawPixilatedImage = React.useCallback(() => {
    const { w, h } = dimensions;
    const pl = Math.round(dimensions.w / pixelationLevel.get());
    if (ctx) {
      ctx.drawImage(image, 0, 0, w, h);
      const imgData = ctx.getImageData(0, 0, w, h);
      ctx.clearRect(0, 0, w, h);

      for (let y = 0; y < h; y += pl) {
        for (let x = 0; x < w; x += pl) {
          let i = (x + y * w) * 4;
          let r = imgData.data[i];
          let g = imgData.data[i + 1];
          let b = imgData.data[i + 2];
          let a = imgData.data[i + 3];
          const [h, s, l] = rgbToHsl(r, g, b, a);
          const adjustedS = s * saturationLevel.get();
          ctx.fillStyle = `hsl(${h * 360}, ${adjustedS * 100}%, ${l * 100}%)`;
          ctx.fillRect(x, y, pl, pl);
        }
      }
    }
  }, [pixelationLevel, dimensions, saturationLevel, image, ctx]);

  React.useLayoutEffect(() => {
    if (canvas.current) {
      canvas.current.width = dimensions.w;
      canvas.current.height = dimensions.h;
      const context = canvas.current.getContext("2d", {
        willReadFrequently: true,
      });
      context!.imageSmoothingEnabled = false;
      setCTX(context);
    }
  }, [dimensions]);

  React.useEffect(() => {
    drawPixilatedImage();
  }, [drawPixilatedImage, dimensions, pixelationLevel]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 1 && !backgroundImage) {
      updateBG(canvas.current!.toDataURL());
    }

    drawPixilatedImage();
  });

  const opacity = useTransform(scrollYProgress, [0.999, 1], [1, 0]);

  return (
    <>
      <motion.canvas
        ref={canvas}
        className="fixed left-0 top-0 block h-screen w-screen"
        style={{ opacity }}
      />
    </>
  );
}
