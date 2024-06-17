import { Link } from "react-router-dom";
import { HeaderAllCapters } from "./components/HeaderAllCapters";
import { useResource } from "../common/useResource";
import { Capter, GroupCapter, Level } from "../@types/game";
import { UserProgress } from "../@types/userProgress";
import { LevelProgress, StatusProgress } from "../@types/progress.d";
import { useAuth } from "../AuthContext";
import { Loading } from "./Loading";
import { useRef } from "react";

type OrderProps = {
  numberOrder: number;
};

const organizateOrder = (data: OrderProps, dataPrev: OrderProps) =>
  data.numberOrder - dataPrev.numberOrder;

type PropsLevelComponent = {
  level: Level;
  levelProgress: LevelProgress | undefined;
  isOpen: boolean;
};

const bgForStatus = {
  TO_DO: "bg-primary-400",
  IN_PROGRESS: "bg-primary-600",
  COMPLETED: "bg-primary-800",
};

const bgForHover = {
  TO_DO: "hover:bg-primary-600",
  IN_PROGRESS: "hover:bg-primary-500",
  COMPLETED: "hover:bg-primary-700",
};

const LevelComponent = ({
  level,
  isOpen,
  levelProgress,
}: PropsLevelComponent) => {
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

type TypeListLevel = {
  listLevel: Level[];
  listLevelProgress: LevelProgress[] | undefined;
};

const ListLevel = ({ listLevel, listLevelProgress }: TypeListLevel) => {
  let isOpen = true;
  return (
    <ul className="flex gap-8">
      {listLevel.sort(organizateOrder).map((level: Level) => {
        const levelProgress = listLevelProgress?.find(
          (data) => level.id === data.id_level
        );
        const prevIsOpen = isOpen;
        if (levelProgress?.status !== "COMPLETED" && isOpen) {
          isOpen = false;
        }
        return (
          <LevelComponent
            key={level.id + level.id_capter}
            level={level}
            levelProgress={levelProgress}
            isOpen={prevIsOpen}
          />
        );
      })}
    </ul>
  );
};

type PropsCapterComponent = {
  group: GroupCapter;
  progress: UserProgress | undefined;
};

const CapterComponent = ({ group, progress }: PropsCapterComponent) => {
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

export const AllCapters = () => {
  const { isLoading } = useAuth();

  const groupCapter = useResource<GroupCapter[]>("/capter");
  const progress = useResource<UserProgress>("/progress/me");

  if (isLoading) return <Loading />;

  return (
    <main className="py-14 bg-primary-100 text-primary-800 space-y-12 min-h-screen">
      <div className="container flex flex-col gap-6">
        <HeaderAllCapters
          objColors={bgForStatus}
          percentComplete={progress?.completeGamePercentage}
        />
        {groupCapter?.length === 0 && (
          <h1 className="text-4xl font-bold text-start">
            Nenhum capitulo foi registrado
          </h1>
        )}
        {groupCapter?.map?.((group, index) => (
          <>
            <h1 className="text-4xl font-bold text-start">
              {index + 1} - {group.titleGroup}
            </h1>
            <div className="h-px w-full bg-primary-600" />
            <div className="space-y-6 w-full">
              <CapterComponent group={group} progress={progress} />
            </div>
          </>
        ))}
      </div>
    </main>
  );
};
