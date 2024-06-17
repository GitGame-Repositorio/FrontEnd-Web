import { Link } from "react-router-dom";
import { LevelProgress, StatusProgress } from "../../../@types/progress.d";
import { Level } from "../../../@types/game.d";
import { bgForHover, bgForStatus } from "../services/services";

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
  const status: StatusProgress = levelProgress?.status || StatusProgress.TO_DO;

  const colorBG = isOpen ? bgForStatus[status] : "bg-gray-500";
  const hoverBG = isOpen ? bgForHover[status] : "hover:bg-gray-600";

  const link =
    status === StatusProgress.COMPLETED || !isOpen ? "" : `/level/${level.id}`;

  return (
    <li key={level.id}>
      <Link
        to={link}
        className={`text-size h-12 w-20 content-center ${colorBG} ${hoverBG} text-primary rounded-xl inline-block hover:bg-primary-700 duration-300`}
      >
        {level.numberOrder}
      </Link>
    </li>
  );
};
