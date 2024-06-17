import { Capter, GroupCapter } from "../../../@types/game";
import { StatusProgress } from "../../../@types/progress.d";
import { UserProgress } from "../../../@types/userProgress.d";
import { ListLevel } from "./ListLevel";
import { bgForStatus, organizateOrder } from "./service";

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
      <div className="flex justify-between w-full" key={capter.id}>
        <div className="space-y-4 w-full">
          <h2 className="text-2xl font-bold text-start">
            {capter.numberOrder} - {capter.title}
          </h2>
          <div className="flex justify-between w-full">
            <ListLevel
              listLevel={capter?.level}
              listLevelProgress={capterProgress?.levelProgress}
              key={capter.id + capter.numberOrder}
            />
            <div
              className={`h-12 w-12 rounded-full ${colorCapter} text-white text-base font-bold content-center`}
            >
              {percentCapter === 100 ? (
                <img src="/check" />
              ) : (
                `${percentCapter || 0}%`
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });
};
