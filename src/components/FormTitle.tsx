/*  2024-07-11 06:29:10


*/

import clsx from "clsx";
import React from "react";

type FormTitleProps = {
  className?: string;
  children: React.ReactNode;
};

const FormTitle = ({ className, children }: FormTitleProps) => {
  return (
    <div className={clsx("text-base font-bold", className)}>{children}</div>
  );
};

export default FormTitle;
