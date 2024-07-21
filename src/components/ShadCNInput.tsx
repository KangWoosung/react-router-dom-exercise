/*  2024-07-07 02:48:18

bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400
*/

import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { UseFormReturn } from "react-hook-form";
import FormTitle from "./FormTitle";
import { cn } from "@/lib/utils";
import { AddTodoFormSchemaType } from "@/schemas/AddTodoFormSchema";

type ShadCNInputProps = React.HTMLAttributes<HTMLInputElement> & {
  form: UseFormReturn<AddTodoFormSchemaType>;
  name: keyof AddTodoFormSchemaType;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
};

const ShadCNInput = ({
  form,
  name,
  label,
  placeholder,
  description,
  className,
}: ShadCNInputProps) => {
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
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              value={field.value as string}
              className={cn(
                className,
                error && "border-destructive",
                "space-y-0  rounded-lg border p-4"
              )}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ShadCNInput;
