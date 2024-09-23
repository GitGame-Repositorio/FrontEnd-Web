import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Button = ({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={twMerge(
        "btn text-base font-medium bg-primary-600 text-primary-100 duration-300 hover:bg-primary-700 content-center uppercase w-1/2",
        className
      )}
      {...rest}
    >
      {children || "Salvar"}
    </button>
  );
};
