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
import { useAppContext } from "@/context/AppContext";
import { drawPixilatedImage } from "../lib/canvas.utils";

interface IHero {
  image: ImageProps & {
    lqip: string;
    width: number;
    height: number;
  };
  scrollYProgress: MotionValue;
}

export default function Hero(props: IHero) {
  const [image, setImage] = React.useState<HTMLImageElement | null>(null);
  const { windowWidth: w } = useAppContext();

  return w !== 0 && image ? (
    <Canvas image={image} scrollYProgress={props.scrollYProgress} />
  ) : (
    <div className="aspect-video h-screen">
      <NextImage
        priority
        onLoad={(e) => setImage(e.target as HTMLImageElement)}
        src="/taxi.webp"
        alt="Taxi"
        fill
      />
    </div>
  );
}

interface ICanvas {
  image: HTMLImageElement;
  scrollYProgress: MotionValue;
}

function Canvas({ image, scrollYProgress }: ICanvas) {
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
  const { windowHeight: h, windowWidth: w, updateBG } = useAppContext();

  const updateCanvas = React.useCallback(
    ({ ctx }: { ctx: CanvasRenderingContext2D }) => {
      const offscreenCanvas = drawPixilatedImage({
        w,
        h,
        pixelationLevel: pixelationLevel.get(),
        saturationLevel: saturationLevel.get(),
        image,
      }) as HTMLCanvasElement;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(offscreenCanvas, 0, 0);
    },
    [w, h, pixelationLevel, saturationLevel, image],
  );

  React.useLayoutEffect(() => {
    if (canvas.current) {
      canvas.current.width = w;
      canvas.current.height = h;
      const context = canvas.current.getContext("2d", {
        willReadFrequently: true,
      });
      context!.imageSmoothingEnabled = false;
      setCTX(context);
    }
  }, [w, h]);

  const setupBG = React.useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!ctx) return;
      const offscreenCanvas = drawPixilatedImage({
        w,
        h,
        pixelationLevel: 12,
        saturationLevel: 0,
        image,
      }) as HTMLCanvasElement;

      updateBG(offscreenCanvas.toDataURL());
    },
    [w, h, image, updateBG],
  );

  React.useEffect(() => {
    if (ctx) {
      setupBG(ctx);
      updateCanvas({ ctx });
    }
  }, [updateCanvas, setupBG, ctx]);

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (ctx) {
      updateCanvas({ ctx });
    }
  });

  const opacity = useTransform(scrollYProgress, [0.99, 1], [1, 0]);

  return (
    <motion.canvas
      ref={canvas}
      className="fixed left-0 top-0 block h-screen w-screen"
      style={{ opacity }}
    />
  );
}
