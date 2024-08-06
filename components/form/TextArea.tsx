import React, { ForwardedRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { z } from "zod";

import Label from "./Label";
import { TextareaFormFieldProps } from "./types";

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaFormFieldProps & ReturnType<UseFormRegister<typeof z.ZodObject>>
>((fieldProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  return (
    <div className="relative">
      <textarea
        rows={5}
        placeholder={fieldProps.label}
        id={fieldProps.name}
        ref={ref}
        name={fieldProps.name}
        onChange={fieldProps.onChange}
        onBlur={fieldProps.onBlur}
        className="peer w-full rounded-md bg-[#272727] p-2 text-sm focus:shadow-md focus:outline-none"
      />
    </div>
  );
});

TextArea.displayName = "TextArea";

export default TextArea;
