/*  2024-07-07 04:16:53


*/

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FormTitle from "./FormTitle";
import { cn } from "@/lib/utils";
import { AddTodoFormSchemaType } from "@/schemas/AddTodoFormSchema";

type ShadCNRadioGroupProps = React.HTMLAttributes<HTMLInputElement> & {
  form: UseFormReturn<AddTodoFormSchemaType>;
  name: keyof AddTodoFormSchemaType;
  label: string;
  description?: string;
  options: { value: string; label: string }[];
  className?: string;
};

const ShadCNRadioGroup = ({
  form,
  name,
  label,
  description,
  options,
  className,
}: ShadCNRadioGroupProps) => {
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
          <div
            className={cn(
              error && "border-destructive",
              className,
              "flex flex-row items-center justify-start space-x-10 space-y-0  rounded-lg border p-4"
            )}
          >
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value as string | undefined}
                className="px-4"
              >
                {options.map((option) => (
                  <FormItem key={option.value} className="space-x-3 space-y-0 ">
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel>{option.label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ShadCNRadioGroup;
