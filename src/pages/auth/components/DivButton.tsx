import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type DivProps = {
  linkCancel: string;
  textCancel: string;
  textButton: string;
  classButtonMain?: string;
  classButtonCancel?: string;
  classDiv?: string;
};

export const DivButton = ({
  classDiv,
  linkCancel,
  textCancel,
  textButton,
  classButtonMain,
  classButtonCancel,
}: DivProps) => {
  return (
    <div className={twMerge("flex gap-4", classDiv)}>
      <Link
        to={linkCancel}
        className={twMerge(
          "btn text-base font-medium border border-solid border-primary-100 text-primary-100 duration-300 hover:bg-primary-100 hover:text-primary-800 w-1/2 content-center uppercase",
          classButtonCancel
        )}
      >
        {textCancel}
      </Link>
      <button
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
