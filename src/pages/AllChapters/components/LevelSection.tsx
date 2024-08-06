import { FaCheck } from "react-icons/fa6";
import { bgForStatus, organizeOrder } from "../services/services";
import { ListContent } from "./ListContent";
import theme from "../../../service/tailwindTheme";
import { Level } from "../../../@types/game.d";
import { LevelProgress, StatusProgress } from "../../../@types/progress.d";

type PropsLevelSection = {
  levelList: Level[];
  listProgress: LevelProgress[] | undefined;
};

export const LevelSection = ({
  levelList,
  listProgress,
}: PropsLevelSection) => {
  return levelList?.sort(organizeOrder)?.map((level: Level) => {
    const progressFind = listProgress?.find(
      (data) => level.id === data?.id_level
    );
    const { status, percentLevel, contentProgress } = progressFind || {};

    const statusLevel: StatusProgress = status || StatusProgress.TO_DO;

    const colorLevel = bgForStatus[statusLevel];

    return (
      <div className="flex justify-between items-center gap-5" key={level.id}>
        <div className="space-y-4 w-[82%]">
          <h2 className="text-lg md:text-2xl font-bold text-start">
            {level.numberOrder} - {level.title}
          </h2>
          <ListContent
            listContent={level.orderLevel}
            listProgress={contentProgress}
            key={level.id + level.numberOrder}
          />
        </div>
        <div
          className={`min-h-12 min-w-12 rounded-full ${colorLevel} text-white text-sm md:text-base font-bold content-center`}
        >
          {percentLevel === 100 ? (
            <FaCheck size={21} color={theme.colors.primary[100]} />
          ) : (
            `${percentLevel || 0}%`
          )}
        </div>
      </div>
    );
  });
};
