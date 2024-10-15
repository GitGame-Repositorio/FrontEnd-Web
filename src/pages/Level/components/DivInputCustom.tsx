import { ReactElement } from "react-markdown/lib/react-markdown";
import { twMerge } from "tailwind-merge";

type DivProps = {
  label: string;
  children: ReactElement;
  className?: string;
};

export const DivInputCustom = ({ className, children, label }: DivProps) => {
  return (
    <div className={twMerge("space-y-2", className)}>
      <h2 className="font-bold text-xl">{label}</h2>
      {children}
    </div>
  );
};
