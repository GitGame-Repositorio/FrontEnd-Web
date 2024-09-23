import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export const ButtonOutline = ({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <Link
      to="#"
      className={twMerge(
        "btn text-base font-medium border border-solid border-primary-600 text-primary-600 duration-300 hover:bg-primary-600 hover:text-primary-100 w-1/2 content-center uppercase",
        className
      )}
      {...rest}
    >
      {children || "Cancelar"}
    </Link>
  );
};
