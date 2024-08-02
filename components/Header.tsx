"use client";
import React from "react";
import { motion, MotionValue, useTransform, Variants } from "framer-motion";
import Logo from "./shared/Logo";

interface IHeader {
  visible: boolean;
}

const container: Variants = {
  hidden: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cell: Variants = {
  hidden: {
    opacity: 0,
    x: "-100%",
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const text: Variants = {
  hidden: {
    y: "300%",
  },
  visible: {
    y: 0,
  },
};

export default function Header(props: IHeader) {
  return (
    <motion.header className="sticky top-0 z-50 grid grid-cols-12">
      <motion.div
        className="relative col-span-2 col-start-1 row-span-1 row-start-1 grid grid-cols-2"
        variants={container}
        initial="hidden"
        animate={props.visible ? "visible" : "hidden"}
      >
        <Cell />
        <Cell />
        <div className="absolute inset-0 content-center overflow-hidden text-center font-mono text-[2.5vw]">
          <motion.div
            className="relative px-[calc(var(--cellW)*0.5)]"
            variants={text}
          >
            <Logo />
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}

function Cell() {
  return (
    <div className="aspect-square w-full overflow-hidden">
      <motion.div variants={cell} className="cell h-full w-full bg-black" />
    </div>
  );
}
