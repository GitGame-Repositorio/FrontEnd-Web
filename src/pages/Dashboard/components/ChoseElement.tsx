import { ReactElement } from "react";

type ChoseElementProps = {
  children: ReactElement;
  disabled: boolean;
  value?: string;
  id: string;
};

export const ChoseElement = ({
  children,
  disabled,
  value,
  id,
}: ChoseElementProps) => {
  return (
    <label htmlFor={`toggle-${id}`}>
      {!disabled && (
        <input type="checkbox" id={`toggle-${id}`} className="peer hidden" />
      )}
      {value && <p className="peer-checked:hidden">{value}</p>}
      {children}
    </label>
  );
};
