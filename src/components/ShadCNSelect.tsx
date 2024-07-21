/*  2024-07-07 04:14:23


*/

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormTitle from "./FormTitle";
// import { useFormFieldError } from "./UseFormFieldError";
import { cn } from "@/lib/utils";
import { AddTodoFormSchemaType } from "@/schemas/AddTodoFormSchema";

// 추가로, ShadCNSelect를 사용할 때 name prop의 타입을 제한하여 문자열 값을 갖는 필드에만 사용할 수 있도록 할 수 있습니다:
type ShadCNSelectProps = React.HTMLAttributes<HTMLSelectElement> & {
  form: UseFormReturn<AddTodoFormSchemaType>;
  name: keyof AddTodoFormSchemaType;
  //   name: Extract<keyof UserType, { [K in keyof UserType]: UserType[K] extends string ? K : never }[keyof UserType]>;
  label: string;
  description?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  className?: string;
};

const ShadCNSelect = ({
  form,
  name,
  label,
  description,
  placeholder,
  options,
  className,
}: ShadCNSelectProps) => {
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
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value as string | undefined}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  error && "border-destructive",
                  className,
                  "space-y-0  rounded-lg border p-4"
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ShadCNSelect;
