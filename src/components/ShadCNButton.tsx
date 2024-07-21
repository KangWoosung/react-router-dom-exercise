/*  2024-07-12 10:10:44


*/

import React from "react";
import { Button } from "./ui/button";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/variants";
import { AddTodoFormSchemaType } from "@/schemas/AddTodoFormSchema";

type ShadCNButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  form?: UseFormReturn<AddTodoFormSchemaType>;
  type?: "submit" | "button" | "reset";
  variant?: "default" | "destructive" | "outline" | "subtle" | "ghost" | "link";
  size?: "default" | "sm" | "xs" | "lg" | "xlg";
  className?: string;
  children: React.ReactNode;
};

const ShadCNButton = ({
  form = undefined,
  type = "button",
  className,
  variant,
  size,
  children,
}: ShadCNButtonProps) => {
  let hasError = false;
  if (form) {
    const {
      formState: { errors },
    } = form;
    hasError = Object.keys(errors).length > 0;
  }

  return (
    <Button
      type={type}
      disabled={hasError ? true : false}
      className={cn(buttonVariants({ variant, size, className }), "", {
        "opacity-50 cursor-not-allowed": hasError,
      })}
    >
      {children}
    </Button>
  );
};

export default ShadCNButton;
