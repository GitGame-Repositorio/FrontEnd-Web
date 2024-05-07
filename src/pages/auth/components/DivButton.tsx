import { Link } from "react-router-dom";

type DivProps = {
  linkCancel: string;
  textCancel: string;
  textButton: string;
};

export const DivButton = ({ linkCancel, textCancel, textButton }: DivProps) => {
  return (
    <div className="flex gap-4">
      <Link
        to={linkCancel}
        className="btn text-base font-medium border border-solid border-primary-100 text-primary-100 duration-300 hover:bg-primary-100 hover:text-primary-800 w-1/2 content-center"
      >
        {textCancel}
      </Link>
      <button className="btn text-base font-medium bg-primary-600 text-primary-100 duration-300 hover:bg-primary-700 w-1/2 content-center">
        {textButton}
      </button>
    </div>
  );
};
