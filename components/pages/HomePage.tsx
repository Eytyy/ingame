"use client";

import type { HomePagePayload } from "@/types";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import React from "react";
import Header from "@/components/Header";
import Hero from "../Hero";
import Block from "../blocks";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAppContext } from "@/context/AppContext";

export interface HomePageProps {
  data: HomePagePayload;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export default function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { cellW, backgroundImage } = useAppContext();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${cellW}px`, `end ${cellW}px`],
  });

  const { scrollYProgress: toExit } = useScroll({
    target: ref,
    offset: [`end ${cellW}px`, `end start`],
  });

  const translateY = useTransform(toExit, [0, 1], ["-100%", "0%"]);

  return (
    <div
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
      }}
    >
      <Hero image={data.image} scrollYProgress={scrollYProgress} />
      <div className="sticky top-0 min-h-screen">
        <motion.div style={{ translateY }} className="sticky top-0 z-10 w-full">
          <Header />
        </motion.div>
        <div className="h-[100vh]" ref={ref} />
        <motion.div>
          {data.content.map((block) => (
            <Block key={block._key} {...block} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
