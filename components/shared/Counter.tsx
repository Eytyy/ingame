import {
  animate,
  AnimationPlaybackControls,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import React from "react";

type Props = {
  value: number;
  direction?: "up" | "down";
};

export default function Counter({ value: n, direction = "up" }: Props) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
  });
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    let count: AnimationPlaybackControls;

    count = animate(0, n, {
      duration: 1,
      onUpdate(value) {
        setValue(parseInt(value.toFixed(2)));
      },
    });
    return () => {
      if (count) count.stop();
    };
  }, [n, isInView]);
  return <span ref={ref}>{value}</span>;
}
