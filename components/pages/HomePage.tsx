"use client";

import type { HomePagePayload } from "@/types";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import React from "react";
import Header from "@/components/Header";
import Hero from "../Hero";
import Block from "../blocks";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useAppContext } from "@/context/AppContext";

export interface HomePageProps {
  data: HomePagePayload;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export default function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const { cellW, backgroundImage } = useAppContext();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${cellW}px`, `end ${cellW}px`],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 1) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const spacerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: spacerYProgress } = useScroll({
    target: ref,
    offset: [`start ${cellW}px`, `end ${cellW}px`],
  });

  useMotionValueEvent(spacerYProgress, "change", (latest) => {
    if (latest === 1) {
      spacerRef.current?.classList.add("invisible");
    } else {
      spacerRef.current?.classList.remove("invisible");
    }
  });

  return (
    <div
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Hero image={data.image} scrollYProgress={scrollYProgress} />
      <Header visible={visible} />
      <div ref={ref} className="h-screen" />
      {data.content.map((block, index) => (
        <Block block={block} index={index} key={block._key} />
      ))}
    </div>
  );
}
