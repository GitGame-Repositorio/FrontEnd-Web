import { ReactElement } from "react";
import { FieldError } from "react-hook-form";

type DivProps = {
  label: string;
  description: string;
  error: FieldError | undefined;
  children: ReactElement;
};

export const DivRawInput = ({
  label,
  description,
  children,
  error,
}: DivProps) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <span className="space-y-1.5 font-bold">
        <h2 className="text-xl">{label}</h2>
        <p className="text-sm">{description}</p>
      </span>
      <div className="flex flex-col items-end">
        {children}
        {error && <p className="text-tertiary">{error.message}</p>}
      </div>
    </div>
  );
};
