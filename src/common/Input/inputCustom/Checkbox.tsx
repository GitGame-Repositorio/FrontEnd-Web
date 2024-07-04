import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Checkbox = forwardRef(
  ({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>, ref) => {
    return (
      <input
        type="checkbox"
        className={twMerge(
          "appearance-none min-h-8 min-w-14 bg-gray-600 rounded-full relative cursor-pointer checked:bg-primary-600 input-check",
          className
        )}
        ref={ref}
        {...rest}
      />
    );
  }
);
