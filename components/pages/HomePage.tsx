"use client";

import type { HomePagePayload } from "@/types";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import React from "react";
import Header from "@/components/Header";
import Hero from "../Hero";
import Block from "../blocks";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { FirstTwoColsSection } from "../blocks/FirstTwoColsSection";
import { cn } from "@/lib/utils";
import ArrowIcon from "../shared/ArrowIcon";

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

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const firstBlockRef = React.useRef<HTMLDivElement>(null);
  const [firstBlock, ...rest] = data.content;

  const { scrollYProgress: scrollToExit } = useScroll({
    target: firstBlockRef,
    offset: [`start ${cellW}px`, `start start`],
  });

  return (
    <>
      {backgroundImage && (
        <div
          className="fixed h-full w-full"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="fixed left-0 top-1/2 z-20 w-full -translate-y-1/2 px-10">
        <motion.p
          className="mx-auto w-fit text-center text-2xl font-bold uppercase text-white backdrop-brightness-75 lg:text-4xl"
          style={{ opacity }}
        >
          {data.heroTitle}
        </motion.p>
      </div>
      <motion.div
        className="fixed bottom-10 left-1/2 z-20 w-14 -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
          x: "-50%",
          transition: {
            y: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            },
          },
        }}
        style={{ opacity }}
      >
        <ArrowIcon />
      </motion.div>
      <Hero image={data.image} scrollYProgress={scrollYProgress} />
      <Header visible={visible} scrollYProgress={scrollToExit} />
      <div ref={ref} className="h-screen" />

      {firstBlock._type == "block.twoColSection" ? (
        <FirstTwoColsSection block={firstBlock} ref={firstBlockRef} />
      ) : null}
      {rest.map((block) => (
        <Block block={block} key={block._key} />
      ))}
    </>
  );
}
