import React, { ForwardedRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { z } from "zod";

import { InputFormFieldProps } from "./types";

const Input = React.forwardRef<
  HTMLInputElement,
  InputFormFieldProps & ReturnType<UseFormRegister<typeof z.ZodObject>>
>((fieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className="relative">
      <input
        placeholder={fieldProps.label}
        ref={ref}
        type={fieldProps.type}
        id={fieldProps.name}
        name={fieldProps.name}
        onChange={fieldProps.onChange}
        onBlur={fieldProps.onBlur}
        className="peer w-full bg-[#262626] p-2 text-sm"
      />
    </div>
  );
});

Input.displayName = "Input";

export default Input;
