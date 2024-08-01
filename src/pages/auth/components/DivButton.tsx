import { InputHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type DivProps = {
  linkCancel: string;
  textCancel: string;
  textButton: string;
  classButtonMain?: string;
  classButtonCancel?: string;
  propsButtonCancel?: InputHTMLAttributes<HTMLButtonElement>;
  propsButtonMain?: InputHTMLAttributes<HTMLButtonElement>;
  classDiv?: string;
};

export const DivButton = ({
  classDiv,
  linkCancel,
  textCancel,
  textButton,
  classButtonMain,
  classButtonCancel,
  propsButtonMain,
  propsButtonCancel,
}: DivProps) => {
  return (
    <div className={twMerge("flex gap-4", classDiv)}>
      <Link
        to={linkCancel}
        className={twMerge(
          "btn text-base font-medium border border-solid border-primary-100 text-primary-100 duration-300 hover:bg-primary-100 hover:text-primary-800 w-1/2 content-center uppercase",
          classButtonCancel
        )}
        {...propsButtonCancel}
      >
        {textCancel}
      </Link>
      <button
        {...propsButtonMain}
        className={twMerge(
          "btn text-base font-medium bg-primary-600 text-primary-100 duration-300 hover:bg-primary-700 w-1/2 content-center uppercase",
          classButtonMain
        )}
      >
        {textButton}
      </button>
    </div>
  );
};
