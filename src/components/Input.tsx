import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

type InputProps = {
  label: string;
  error: FieldError | undefined;
};

export const Input = forwardRef(
  ({ label, error, ...rest }: InputProps, ref) => {
    const classInput = "h-[3.125rem] w-full bg-primary px-4 rounded-lg text-black";

    return (
      <div className="space-y-2">
        <h1 className="text-xl">{label}</h1>
        <input className={classInput} required ref={ref} {...rest} />
        {error && <p className="text-tertiary">{error.message}</p>}
      </div>
    );
  }
);
