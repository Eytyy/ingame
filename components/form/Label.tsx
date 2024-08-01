import React from "react";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  name: string;
  setLabelHeight: (height: number) => void;
  className?: string;
};

export default function Label({ label, name, className }: Props) {
  return (
    <label
      className={cn("absolute left-2 top-2 z-10 peer-focus:hidden", className)}
      htmlFor={name}
    >
      {label}
    </label>
  );
}
