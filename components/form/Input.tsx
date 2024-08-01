import React, { ForwardedRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { z } from "zod";

import Label from "./Label";
import { InputFormFieldProps } from "./types";

const Input = React.forwardRef<
  HTMLInputElement,
  InputFormFieldProps & ReturnType<UseFormRegister<typeof z.ZodObject>>
>((fieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [labelHeight, setLabelHeight] = React.useState(0);

  return (
    <div className="relative">
      <input
        ref={ref}
        type={fieldProps.type}
        id={fieldProps.name}
        name={fieldProps.name}
        onChange={fieldProps.onChange}
        onBlur={fieldProps.onBlur}
        className="peer w-full bg-[#262626] p-2 pt-8 text-sm"
        style={{ paddingTop: `${labelHeight + 12}px` }}
      />

      <Label
        name={fieldProps.name}
        label={fieldProps.label}
        setLabelHeight={setLabelHeight}
      />
    </div>
  );
});

Input.displayName = "Input";

export default Input;
