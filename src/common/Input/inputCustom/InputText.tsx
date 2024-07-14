import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const InputText = forwardRef(
  ({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>, ref) => {
    return (
      <input
        max="125"
        className={twMerge(
          "h-12 w-full bg-primary-100 px-4 rounded-lg text-primary-800 focus:outline focus:outline-primary-600 placeholder:text-primary-600",
          className
        )}
        required
        ref={ref}
        {...rest}
      />
    );
  }
);
