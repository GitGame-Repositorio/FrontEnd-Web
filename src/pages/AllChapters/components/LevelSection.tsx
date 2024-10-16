import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { bgForStatus, organizeOrder } from "../services/services";
import { ListContent } from "./ListContent";
import theme from "../../../service/tailwindTheme";
import { StatusProgress } from "../../../@types/progress.d";
import { LevelRemap } from "../type/remap";

type PropsLevelSection = {
  levelList: LevelRemap[];
};

export const LevelSection = ({ levelList }: PropsLevelSection) => {
  return levelList?.sort(organizeOrder)?.map((level: LevelRemap) => {
    const statusLevel: StatusProgress = level.status || StatusProgress.TO_DO;
    const colorLevel = bgForStatus[statusLevel];

    return (
      <div className="flex justify-between items-center gap-5" key={level.id}>
        <div className="space-y-4 w-[82%]">
          <Link
            to={`/level/${level?.id}`}
            className="hover:text-primary-600 hover:duration-300 inline-block"
          >
            <h2 className="text-lg md:text-2xl font-bold text-start">
              {level.numberOrder} - {level.title}
            </h2>
          </Link>
          <ListContent
            listContent={level.content}
            key={level.id + level.numberOrder}
          />
        </div>
        <div
          className={`min-h-12 min-w-12 rounded-full ${colorLevel} text-white text-sm md:text-base font-bold content-center`}
        >
          {level.percentLevel === 100 ? (
            <FaCheck size={21} color={theme.colors.primary[100]} />
          ) : (
            `${level.percentLevel || 0}%`
          )}
        </div>
      </div>
    );
  });
};
