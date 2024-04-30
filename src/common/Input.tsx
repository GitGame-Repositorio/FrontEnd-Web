import { ReactElement, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type InputProps = {
  label: string;
  error: FieldError | undefined;
  icon?: ReactElement;
};

export const Input = forwardRef(
  ({ label, error, icon, ...rest }: InputProps, ref) => {
    const classInput =
      "h-12 w-full bg-primary px-4 rounded-lg text-black outline-1 outline-primary-600";

    return (
      <div className="space-y-2">
        <h1 className="text-xl">{label}</h1>
        <input className={classInput} required ref={ref} {...rest} />
        {icon && <img src={icon} className="-ml-12" />}
        {error && <p className="text-tertiary">{error.message}</p>}
      </div>
    );
  }
);
