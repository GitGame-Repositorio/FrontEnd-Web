import { ReactElement } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type DivProps = {
  label: string;
  error: FieldError | undefined;
  children: ReactElement;
  className?: string;
  labelClassName?: string;
};

export const DivInput = ({
  label,
  error,
  children,
  className,
  labelClassName,
}: DivProps) => {
  return (
    <div>
      <label className={twMerge("space-y-2", className)}>
        <h2 className={twMerge("font-bold text-xl", labelClassName)}>
          {label}
        </h2>
        {children}
        {error && <p className="text-tertiary">{error.message}</p>}
      </label>
    </div>
  );
};
