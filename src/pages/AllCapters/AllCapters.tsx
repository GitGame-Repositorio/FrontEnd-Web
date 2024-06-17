import { HeaderAllCapters } from "./components/HeaderAllCapters";
import { CapterSection } from "./components/CapterSection";
import { UserProgress } from "../../@types/userProgress.d";
import { useResource } from "../../common/useResource";
import { GroupCapter } from "../../@types/game.d";
import { useAuth } from "../../AuthContext";
import { Loading } from "../Loading";

export const AllCapters = () => {
  const { isLoading } = useAuth();

  const groupCapter = useResource<GroupCapter[]>("/capter");
  const progress = useResource<UserProgress>("/progress/me");

  if (isLoading) return <Loading />;

  return (
    <main className="py-14 bg-primary-100 text-primary-800 space-y-12 min-h-screen">
      <div className="container flex flex-col gap-6">
        <HeaderAllCapters percentComplete={progress?.completeGamePercentage} />
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
              <CapterSection group={group} progress={progress} />
            </div>
          </>
        ))}
      </div>
    </main>
  );
};
