import { twMerge } from "tailwind-merge";
import { ReactElement } from "react";

type EventDiv = React.SyntheticEvent<HTMLDivElement, Event>;

export type CardProps = {
  children?: ReactElement;
  onClick?: (e: EventDiv) => void;
  className?: string;
};

export const Card = ({ className, children, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "bg-primary-800 py-3 px-6 rounded-xl min-w-80 h-max cursor-pointer text-primary",
        className
      )}
    >
      {children}
    </div>
  );
};
