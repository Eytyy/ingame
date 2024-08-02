import useTextWrapperBounds from "@/hooks/useTextWrapperBounds";
import { cn } from "@/lib/utils";
import { ITwoColSection } from "@/types";
import React, { PropsWithChildren } from "react";

export default function TextBlockWrapper({
  children,
  layout,
}: PropsWithChildren<{
  layout: ITwoColSection["layout"];
}>) {
  const { ref, bounds } = useTextWrapperBounds();

  return (
    <div
      className={cn(
        "relative",
        "col-span-5 row-start-1",
        layout === "contentImage" ? "col-start-1" : "col-start-8",
      )}
      style={{
        height: `${bounds.height}px`,
        backgroundColor: "black",
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}
