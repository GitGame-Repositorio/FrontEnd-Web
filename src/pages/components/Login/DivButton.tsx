import { Link } from "react-router-dom";

type DivProps = {
  page: "register" | "login";
  textCancel: string;
  textButton: string;
};

export const DivButton = ({ page, textCancel, textButton }: DivProps) => {
  const pageLink = page === "login" ? "/register" : "/login";
  return (
    <div className="flex justify-end gap-4 pt-4">
      <Link
        to={pageLink}
        className="btn btn-primary border-2 border-solid border-primary-100 text-primary-100 duration-300 hover:bg-primary-100 hover:text-primary-800 w-28 content-center"
        data-cy={`${page}-save`}
      >
        {textCancel}
      </Link>
      <button
        className="btn btn-primary bg-primary-600 text-primary-100 duration-300 hover:bg-primary-700 w-28 content-center"
        data-cy={`${page}-redirect_login`}
      >
        {textButton}
      </button>
    </div>
  );
};
