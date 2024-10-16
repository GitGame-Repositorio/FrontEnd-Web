import { IoMdLock } from "react-icons/io";
import { Link } from "react-router-dom";

import { StatusProgress } from "../../../@types/progress.d";
import { bgForHover, bgForStatus } from "../services/services";
import { ContentRemap } from "../type/remap";
import theme from "../../../service/tailwindTheme";

type PropsLevelButton = {
  content: ContentRemap;
  isOpen: boolean;
};

export const ButtonContent = ({ content, isOpen }: PropsLevelButton) => {
  const status: StatusProgress = content?.complete
    ? StatusProgress.COMPLETED
    : isOpen
    ? StatusProgress.TO_DO
    : StatusProgress.BLOCK;

  const { id, title, numberOrder } = content;

  const link = !isOpen ? "" : `/content/${id}`;

  return (
    <li key={id}>
      <attr title={title}>
        <Link
          to={link}
          className={`text-size h-12 w-20 content-center ${bgForStatus[status]} ${bgForHover[status]} text-primary rounded-xl inline-block duration-300`}
        >
          {String(numberOrder).padStart(3, "0")}
          {!isOpen && (
            <IoMdLock className="ml-1" color={theme.colors.primary} />
          )}
        </Link>
      </attr>
    </li>
  );
};
