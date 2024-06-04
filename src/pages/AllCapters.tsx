import { Link } from "react-router-dom";
import { HeaderAllCapters } from "./components/HeaderAllCapters";
import { useResource } from "../common/useResource";
import { Capter, GroupCapter, Level } from "../@types/game";
import { UserProgress } from "../@types/userProgress";
import { LevelProgress, StatusProgress } from "../@types/progress.d";

type OrderProps = {
  numberOrder: number;
};

const organizateOrder = (data: OrderProps, dataPrev: OrderProps) =>
  data.numberOrder - dataPrev.numberOrder;

type PropsLevelComponent = {
  level: Level;
  levelProgress: LevelProgress | undefined;
};

const bgForStatus = {
  TO_DO: "bg-primary-800",
  IN_PROGRESS: "bg-primary-600",
  COMPLETED: "bg-primary-400",
};

const bgForHover = {
  TO_DO: "bg-primary-700",
  IN_PROGRESS: "bg-primary-500",
  COMPLETED: "bg-primary-600",
};

const LevelComponent = ({ level, levelProgress }: PropsLevelComponent) => {
  const status: StatusProgress = levelProgress?.status || StatusProgress.TO_DO;

  const colorBG = bgForStatus[status];
  const hoverBG = bgForHover[status];

  return (
    <li key={level.id}>
      <Link
        to="/activity"
        className={`text-size h-12 w-20 content-center ${colorBG} ${hoverBG} text-primary rounded-xl inline-block hover:bg-primary-700 duration-300`}
      >
        {level.numberOrder}
      </Link>
    </li>
  );
};

export const AllCapters = () => {
  const groupCapter = useResource<GroupCapter[]>("/capter");
  const progress = useResource<UserProgress>("/user/me/progress");

  return (
    <main className="py-14 bg-primary-100 text-primary-800 space-y-12 min-h-screen">
      <div className="container flex flex-col gap-6">
        <HeaderAllCapters />
        {groupCapter?.map((group) => (
          <>
            <h1 className="text-4xl font-bold text-start">
              {group.titleGroup}
            </h1>
            <div className="h-px w-full bg-primary-600" />
            <div className="space-y-6 w-full">
              {group.listCapter?.sort(organizateOrder).map((capter: Capter) => {
                const { capterProgress, percentCapter } =
                  progress?.allCapterRemap.find(
                    (data) => capter.id === data.capterProgress.id_capter
                  ) || {};
                const statusCapter: StatusProgress =
                  capterProgress?.status || StatusProgress.TO_DO;

                const colorCapter = bgForStatus[statusCapter];

                return (
                  <div className="flex justify-between w-full">
                    <div className="space-y-4 w-full" key={capter.id}>
                      <h2 className="text-2xl font-bold text-start">
                        {capter.numberOrder} - {capter.title}
                      </h2>
                      <div className="flex justify-between w-full">
                        <ul className="flex gap-8">
                          {capter?.level
                            .sort(organizateOrder)
                            .map((level: Level) => {
                              const levelProgress =
                                capterProgress?.levelProgress.find(
                                  (data) => level.id === data.id_level
                                );
                              return (
                                <LevelComponent
                                  level={level}
                                  levelProgress={levelProgress}
                                />
                              );
                            })}
                        </ul>
                        <div
                          className={`h-12 w-12 rounded-full ${colorCapter} text-white text-base font-bold content-center`}
                        >
                          {/* {percentCapter === 100 ? <img src="/check"> : percentCapter} */}
                          {percentCapter || 0}%
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ))}
      </div>
    </main>
  );
};
