import { HeaderAllCapters } from "./components/HeaderAllCapters";
import { CapterSection } from "./components/CapterSection";
import { UserProgress } from "../../@types/userProgress.d";
import { useResource } from "../../common/useResource";
import { GroupCapter } from "../../@types/game.d";
import { useAuth } from "../../AuthContext";
import { Loading } from "../Loading";
import { useMenu } from "../../common/menuAction/useMenuAction";

export const AllCapters = () => {
  const { isLoading } = useAuth();

  const groupCapter = useResource<GroupCapter[]>("/capter");
  const progress = useResource<UserProgress>("/progress/me");

  const menuAction = useMenu();

  if (isLoading) return <Loading />;

  return (
    <main
      className="bg-primary-100 lg:pt-8 text-primary-800 space-y-12 min-h-screen"
      onClick={menuAction.closeMenuPage}
    >
      <HeaderAllCapters
        menuActionHook={menuAction}
        percentComplete={progress?.completeGamePercentage}
      />

      <div className="container flex flex-col gap-6">
        {groupCapter?.length === 0 && (
          <h1 className="text-2xl md:text-4xl font-bold text-start">
            Nenhum capitulo foi registrado
          </h1>
        )}
        {groupCapter?.map?.((group, index) => (
          <>
            <h1 className="text-2.5xl md:text-4xl font-bold text-start">
              {index + 1} - {group.titleGroup}
            </h1>
            <hr className="h-px w-full bg-primary-600" />
            <div className="space-y-6 pb-14">
              <CapterSection group={group} progress={progress} />
            </div>
          </>
        ))}
      </div>
    </main>
  );
};
