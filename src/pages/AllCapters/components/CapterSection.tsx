import { Capter, GroupCapter } from "../../../@types/game.d";
import { StatusProgress } from "../../../@types/progress.d";
import { UserProgress } from "../../../@types/userProgress.d";
import { ListLevel } from "./ListLevel";
import { bgForStatus, organizateOrder } from "../services/services";
import { FaCheck } from "react-icons/fa6";
import theme from "../../../service/tailwindTheme";

type PropsCapterSection = {
  group: GroupCapter;
  progress: UserProgress | undefined;
};

export const CapterSection = ({ group, progress }: PropsCapterSection) => {
  return group?.listCapter?.sort(organizateOrder).map((capter: Capter) => {
    const progressFind = progress?.allCapterRemap.find(
      (data) => capter.id === data?.capterProgress?.id_capter
    );
    const { capterProgress, percentCapter } = progressFind || {};

    const statusCapter: StatusProgress =
      capterProgress?.status || StatusProgress.TO_DO;

    const colorCapter = bgForStatus[statusCapter];

    return (
      <div className="flex justify-between items-center gap-5" key={capter.id}>
        <div className="space-y-4 w-[85%]">
          <h2 className="text-lg md:text-2xl font-bold text-start">
            {capter.numberOrder} - {capter.title}
          </h2>
          <ListLevel
            listLevel={capter?.level}
            listLevelProgress={capterProgress?.levelProgress}
            key={capter.id + capter.numberOrder}
          />
        </div>
        <div
          className={`min-h-12 min-w-12 rounded-full ${colorCapter} text-white text-sm md:text-base font-bold content-center`}
        >
          {percentCapter === 100 ? (
            <FaCheck size={21} color={theme.colors.primary[100]} />
          ) : (
            `${percentCapter || 0}%`
          )}
        </div>
      </div>
    );
  });
};
