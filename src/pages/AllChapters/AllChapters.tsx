import { HeaderAllChapters } from "./components/HeaderAllChapters";
import { useMenu } from "../../common/menuAction/useMenuAction";
import { useResource } from "../../common/useResource";
import { useAuth } from "../../AuthContext";
import { Loading } from "../Loading";

import { UserProgress } from "./type/userProgress";
import { StatusProgress } from "../../@types/progress.d";
import { organizeOrder } from "./services/services";
import { LevelSection } from "./components/LevelSection";

export const AllChapters = () => {
  const { isLoading } = useAuth();

  const progress = useResource<UserProgress>("/progress/me");
  const chapterList = progress?.allChapterRemap;

  const menuAction = useMenu();

  if (isLoading) return <Loading />;

  return (
    <main
      className="bg-primary-100 text-primary-800 space-y-12 min-h-screen"
      onClick={menuAction.closeMenuPage}
    >
      <HeaderAllChapters percentComplete={progress?.completeGamePercentage} />

      <div className="container flex flex-col gap-6">
        {chapterList?.length === 0 && (
          <h1 className="text-2xl md:text-4xl font-bold text-start">
            Nenhum capitulo foi registrado
          </h1>
        )}
        {chapterList?.sort(organizeOrder).map((chapter, index) => {
          const { title, status, level } = chapter;

          return (
            <div className="flex flex-col gap-6" key={`${title}-${index}`}>
              <div className="flex justify-between gap-2">
                <h1 className="text-2.5xl md:text-4xl font-bold text-start">
                  {index + 1} - {title}
                </h1>
                {status === StatusProgress.COMPLETED && (
                  <button className="btn py-2 bg-primary-600 hover:bg-primary-800 text-primary-100 font-bold">
                    Avaliação
                  </button>
                )}
              </div>
              <hr className="line-custom md:hidden" />
              <div className="space-y-6 pb-14">
                <LevelSection levelList={level} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
