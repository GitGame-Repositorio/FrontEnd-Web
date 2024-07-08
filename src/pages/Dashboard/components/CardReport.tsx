import { MdOutlineEdit } from "react-icons/md";

import theme from "../../../service/tailwindTheme";
import { vocabulary } from "../../../translator";
import { Report } from "../../../@types/game";

const bgColors = {
  OPENED: "bg-primary-600",
  RESOLVED: "bg-primary-950",
  CLOSED: "bg-primary-200 text-primary-500",
};

export const CardReport = ({ title, description, status }: Report) => {
  return (
    <div className="bg-primary-800 py-4 px-3 rounded-xl w-full space-y-2.5 text-base text-primary font-bold">
      <div className="flex justify-between items-center">
        <p>{title}</p>
        <div className="flex gap-2">
          <span className={`px-3 py-2.5 rounded-xl ${bgColors[status]}`}>
            {vocabulary[status]}
          </span>
          <button className="bg-primary-600 rounded-xl content-center min-w-11 min-h-10">
            <MdOutlineEdit size={22} color={theme.colors.primary[50]} />
          </button>
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
};
