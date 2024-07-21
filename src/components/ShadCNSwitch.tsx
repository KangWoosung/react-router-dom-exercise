/*  2024-07-11 05:08:05


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
import { Switch } from "@/components/ui/switch";
import FormTitle from "./FormTitle";
import { cn } from "@/lib/utils";
import { AddTodoFormSchemaType } from "@/schemas/AddTodoFormSchema";

type ShadCNSwitchProps = React.HTMLAttributes<HTMLInputElement> & {
  form: UseFormReturn<AddTodoFormSchemaType>;
  name: keyof AddTodoFormSchemaType;
  label: string;
  description?: string;
  options?: { value: string; label: string }[];
  className?: string;
};

const ShadCNSwitch = ({
  form,
  name,
  label,
  description,
  className,
}: ShadCNSwitchProps) => {
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
            <div className="space-y-0.5 max-w-[calc(90%-4rem)]">
              <FormLabel className="text-base">{label}</FormLabel>
              {description && <FormDescription>{description}</FormDescription>}
            </div>
            <FormControl>
              <Switch
                checked={field.value as boolean | undefined}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ShadCNSwitch;
