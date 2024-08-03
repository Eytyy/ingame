import {
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

export default function Counter({ value, direction = "up" }: Props) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "up" ? 0 : value);
  const springValue = useSpring(motionValue, { damping: 10, stiffness: 100 });
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "up" ? value : 0);
    }
  }, [isInView, motionValue, value, direction]);

  useMotionValueEvent(springValue, "change", (latest) => {
    setCount(Math.min(Math.round(latest), value));
  });

  return <span ref={ref}>{count}</span>;
}
