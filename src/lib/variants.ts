/*  2024-07-12 17:03:36

variants 3종을 준비해놓자.
1. button
2. link
3. icon

*/

import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "text-primary-button border border-2 border-solid  border-primary-button-border rounded-md",
  {
    variants: {
      variant: {
        default:
          " bg-primary-button-background relative  after:opacity-[40%] z-10 after:absolute after:left-0 after:-bottom-[2px] after:w-full after:h-[3px] hover:after:h-[20px]   after:bg-destructive after:transition-all after:duration-300 after:-z-10        ",
        destructive: "text-destructive bg-transparent border-destructive ",
        outline: " bg-transparent ",
        subtle:
          " bg-primary-button-background relative after:opacity-[40%] z-10 after:absolute after:left-0 after:-bottom-[2px] after:w-full after:h-[3px] hover:after:h-[16px] after:bg-destructive after:transition-all after:duration-300 after:-z-10 ",
        ghost: " bg-slate-300 bg-opacity-20 border-0 ",
        link: " bg-transparent border-transparent ",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 py-2 px-3 text-sm font-light",
        xs: "h-6 py-1 px-2 text-xs font-thin",
        lg: "h-12 py-3 px-5 text-lg font-bold border-[3px]",
        xlg: "h-14 py-4 px-6 text-xl font-extrabold border-[4px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const linkVariants = cva(
  "relative text-primary-button hover:text-primary-button text-xl w-fit block after:block after:content-[''] after:absolute -hover:after:y-10px after:transition-all after:duration-300",
  {
    variants: {
      variant: {
        default:
          "  after:h-[5px] after:bg-destructive after:w-full after:scale-x-0 after:hover:scale-x-100  after:origin-center",
        left: "  after:h-[5px] after:bg-destructive after:w-full after:scale-x-0 after:hover:scale-x-100  after:origin-left ",
        right:
          "  after:h-[5px] after:bg-destructive after:w-full after:scale-x-0 after:hover:scale-x-100  after:origin-right",
        thickness:
          "  z-10 after:absolute after:left-0 after:-bottom-1.5 after:w-full after:h-[5px] hover:after:h-4   after:bg-destructive after:-z-10",
      },
      size: {
        default: "",
        sm: "",
        xs: "",
        lg: "",
        xlg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const iconVariants = cva("rounded-md", {
  variants: {
    variant: {
      default: "text-primary-button",
      destructive: "text-destructive",
      outline: "text-primary-button",
      subtle: "text-primary-button",
      ghost: "text-primary-button",
      link: "text-primary-button",
    },
    size: {
      default: "",
      sm: "",
      xs: "",
      lg: "",
      xlg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
