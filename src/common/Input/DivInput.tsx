import { ReactElement } from "react";
import { FieldError } from "react-hook-form";

type InputProps = {
  label: string;
  error: FieldError | undefined;
  children: ReactElement;
};

export const DivInput = ({ label, children, error }: InputProps) => {
  return (
    <div className="space-y-2">
      <h1 className="text-xl">{label}</h1>
      {children}
      {error && <p className="text-tertiary">{error.message}</p>}
    </div>
  );
};
