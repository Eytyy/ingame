import React, { ForwardedRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

import Label from './Label'
import { OptionsFormFieldProps } from './types'

const Select = React.forwardRef<
  HTMLSelectElement,
  OptionsFormFieldProps &
    ReturnType<
      UseFormRegister<typeof z.ZodObject<{ [key: string]: z.ZodTypeAny }>>
    >
>((fieldProps, ref: ForwardedRef<HTMLSelectElement>) => {
  const [labelHeight, setLabelHeight] = React.useState(0)
  return (
    <div className="relative">
      <Label
        className="en:left-3 ar:right-3 text-sm  text-gray-500"
        name={fieldProps.name}
        label={fieldProps.label}
        setLabelHeight={setLabelHeight}
      />
      <select
        ref={ref}
        id={fieldProps.name}
        name={fieldProps.name}
        onChange={fieldProps.onChange}
        onBlur={fieldProps.onBlur}
        className="border p-2 rounded-md w-full focus:outline-none focus:border-black"
        style={{ paddingTop: `${labelHeight + 12}px` }}
      >
        <option value="">
          {fieldProps.placeholder ||
            `Select a ${fieldProps.label.toLowerCase()}`}
        </option>
        {fieldProps.options.map((option) => (
          <option key={option._key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
})

Select.displayName = 'Select'

export default Select
