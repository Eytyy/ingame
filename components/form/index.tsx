import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import FormMessage from "./FormMessage";
import TextArea from "./TextArea";
import Input from "./Input";

async function sendEmail(data: { [key: string]: any }) {
  const response = await fetch("/api/form-submission", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (response.ok) {
    return result;
  }
  throw new Error(result);
}

export default function Form() {
  const [submitting, setSubmitting] = React.useState(false);
  const schema = z.object({
    _id: z.string(),
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    message: z.object({
      value: z.string().min(1, { message: "Message is required" }),
      label: z.string().min(1, { message: "Message is required" }),
    }),
  });

  const { reset, register, handleSubmit, formState } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
  });

  const processForm: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    try {
      setSubmitting(true);
      await sendEmail(data);
      toast.success("Email sent!");
      setSubmitting(false);
      reset();
    } catch (e) {
      setSubmitting(false);
      reset(data);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="relative p-[var(--cellW)] pt-0 lg:px-[calc(var(--cellW)*0.5)] lg:pb-0">
      <form
        onSubmit={handleSubmit(processForm)}
        className="flex flex-col space-y-8"
      >
        <div className="space-y-8">
          <div>
            {/* @ts-ignore */}
            <Input {...register("name")} type="input" label="Name" />
            <FormMessage message={formState.errors.name?.message as string} />
          </div>
          <div>
            {/* @ts-ignore */}

            <Input type="email" label="Email" {...register("email")} />
            <FormMessage message={formState.errors.email?.message as string} />
          </div>
          <div>
            {/* @ts-ignore */}

            <TextArea label="Message" {...register("message")} />
            <FormMessage
              message={formState.errors.message?.["value"]?.message as string}
            />
          </div>
        </div>
        <div>
          <button
            disabled={submitting}
            className="bg-[#272727] px-6 py-3"
            type="submit"
          >
            {submitting ? "Submitting..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
