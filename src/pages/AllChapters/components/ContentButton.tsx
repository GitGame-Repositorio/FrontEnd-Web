import { IoMdLock } from "react-icons/io";
import { Link } from "react-router-dom";

import { ContentProgress, StatusProgress } from "../../../@types/progress.d";
import { bgForHover, bgForStatus } from "../services/services";
import { OrderLevel } from "../../../@types/game.d";
import theme from "../../../service/tailwindTheme";

type PropsLevelButton = {
  progress: ContentProgress | undefined;
  content: OrderLevel;
  isOpen: boolean;
};

export const Button = ({ content, isOpen, progress }: PropsLevelButton) => {
  const status: StatusProgress = isOpen
    ? progress?.status || StatusProgress.TO_DO
    : StatusProgress.BLOCK;

  const link =
    status === StatusProgress.COMPLETED || !isOpen
      ? ""
      : `/level/${content.id}`;

  console.log(content);

  const contentType = content.subject.length ? "subject" : "activity";
  const titleValue =
    contentType === "subject"
      ? content.subject[0].title
      : content.activity[0]?.assessment?.title;

  return (
    <li key={content.id}>
      <attr title={titleValue}>
        <Link
          to={link}
          className={`text-size h-12 w-20 content-center ${bgForStatus[status]} ${bgForHover[status]} text-primary rounded-xl inline-block duration-300`}
        >
          {contentType === "subject" ? "As" : "At"} - {content.order}
          {!isOpen && (
            <IoMdLock className="ml-1" color={theme.colors.primary} />
          )}
        </Link>
      </attr>
    </li>
  );
};
