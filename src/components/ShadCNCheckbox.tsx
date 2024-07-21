/*  2024-07-07 04:17:40


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
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { AddTodoFormSchemaType } from "@/schemas/AddTodoFormSchema";
import FormTitle from "./FormTitle";

// ShadCNCheckboxProps의 name 타입을 제한하여 boolean 타입의 필드에만 사용할 수 있도록 했습니다:
type ShadCNCheckboxProps = React.HTMLAttributes<HTMLInputElement> & {
  form: UseFormReturn<AddTodoFormSchemaType>;
  //   name: keyof UserType;
  name: Extract<
    keyof AddTodoFormSchemaType,
    {
      [K in keyof AddTodoFormSchemaType]: AddTodoFormSchemaType[K] extends boolean
        ? K
        : never;
    }[keyof AddTodoFormSchemaType]
  >;

  label: string;
  description?: string;
  className?: string;
};

const ShadCNCheckbox = ({
  form,
  name,
  label,
  description,
  className,
}: ShadCNCheckboxProps) => {
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
              "flex flex-row items-center justify-start space-x-5 space-y-0  rounded-lg border p-4"
            )}
          >
            <FormControl>
              <Checkbox
                checked={field.value as boolean}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                }}
                className="bg-secondary"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{label}</FormLabel>
              {description && <FormDescription>{description}</FormDescription>}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ShadCNCheckbox;
