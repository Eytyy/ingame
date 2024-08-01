import React, { ForwardedRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { z } from "zod";

import Label from "./Label";
import { TextareaFormFieldProps } from "./types";

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaFormFieldProps & ReturnType<UseFormRegister<typeof z.ZodObject>>
>((fieldProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  const [labelHeight, setLabelHeight] = React.useState(0);

  return (
    <div className="relative">
      <textarea
        rows={5}
        id={fieldProps.name}
        ref={ref}
        name={fieldProps.name}
        onChange={fieldProps.onChange}
        onBlur={fieldProps.onBlur}
        className="peer w-full rounded-md bg-[#272727] p-2 pt-8 text-sm focus:shadow-md focus:outline-none"
        style={{
          paddingTop: `${labelHeight + 8}px`,
        }}
      />
      <Label
        name={fieldProps.name}
        label={fieldProps.label}
        setLabelHeight={setLabelHeight}
      />
    </div>
  );
});

TextArea.displayName = "TextArea";

export default TextArea;
