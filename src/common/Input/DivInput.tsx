import { ReactElement } from "react";
import { FieldError } from "react-hook-form";

type DivProps = {
  label: string;
  error: FieldError | undefined;
  children: ReactElement;
};

export const DivInput = ({ label, children, error }: DivProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">{label}</h2>
      {children}
      {error && <p className="text-tertiary">{error.message}</p>}
    </div>
  );
};
