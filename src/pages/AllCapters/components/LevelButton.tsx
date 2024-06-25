import { Link } from "react-router-dom";
import { LevelProgress, StatusProgress } from "../../../@types/progress.d";
import { Level } from "../../../@types/game.d";
import { bgForHover, bgForStatus } from "../services/services";
import { IoMdLock } from "react-icons/io";
import theme from "../../../service/tailwindTheme";

type PropsLevelButton = {
  level: Level;
  levelProgress: LevelProgress | undefined;
  isOpen: boolean;
};

export const LevelButton = ({
  level,
  isOpen,
  levelProgress,
}: PropsLevelButton) => {
  const status: StatusProgress = isOpen
    ? levelProgress?.status || StatusProgress.TO_DO
    : StatusProgress.BLOCK;

  const link =
    status === StatusProgress.COMPLETED || !isOpen ? "" : `/level/${level.id}`;

  return (
    <li key={level.id}>
      <Link
        to={link}
        className={`text-size h-12 w-20 content-center ${bgForStatus[status]} ${bgForHover[status]} text-primary rounded-xl inline-block hover:bg-primary-700 duration-300`}
      >
        {level.numberOrder}
        {!isOpen && <IoMdLock className="ml-1" color={theme.colors.primary} />}
      </Link>
    </li>
  );
};
