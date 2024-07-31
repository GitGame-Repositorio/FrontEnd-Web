import { twMerge } from "tailwind-merge";

type PropsLabel = {
  className?: string;
  value: string;
};

export const Label = ({ value, className }: PropsLabel) => {
  return (
    <span
      className={twMerge(
        "bg-primary-200 px-4 py-2 rounded-xl border border-solid border-primary-600 text-primary-800 flex items-center font-medium",
        className
      )}
      key={`label-${value}`}
    >
      {value}
    </span>
  );
};
