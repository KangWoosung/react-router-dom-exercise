/*  2024-07-20 20:27:07



*/

import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { UseFormReturn } from "react-hook-form";
import FormTitle from "./FormTitle";
import { cn } from "@/lib/utils";
import { AddTodoFormSchemaType } from "@/schemas/AddTodoFormSchema";

type ShadCNTextareaProps = React.HTMLAttributes<HTMLInputElement> & {
  form: UseFormReturn<AddTodoFormSchemaType>;
  name: keyof AddTodoFormSchemaType;
  label: string;
  description?: string;
  className?: string;
};

const ShadCNTextarea = ({
  form,
  name,
  label,
  description,
  className,
}: ShadCNTextareaProps) => {
  const {
    formState: { errors },
  } = form;
  const error = errors[name]?.message;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormTitle>{label}</FormTitle>
          {/* <FormLabel>Bio</FormLabel> */}
          <FormControl>
            <Textarea
              placeholder={label}
              className={cn(
                error && "border-destructive",
                className,
                "flex flex-row items-center justify-start space-x-10 space-y-0  rounded-lg border p-4"
              )}
              {...field}
              value={
                typeof field.value === "boolean"
                  ? String(field.value)
                  : field.value
              }
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ShadCNTextarea;
