import { Link, useParams } from "react-router-dom";
import { useResource } from "../../common/useResource";
import { Level as LevelType, OrderLevel } from "../../@types/game";
import { NotFoundPage } from "../NotFoundPage";
import { Activity } from "./Activity";
import { Subject } from "./Subject";
import { ContentProgress } from "../../@types/progress";
import { HeaderGame } from "../../common/HeaderLevel";
import { useModal } from "../../common/modal/useModal";
import { ModalReport } from "../../common/modal/modalCustom/ModalReport";
import { api } from "../../api";

const completeContent = async ({
  id_level_progress,
  id_order_level,
}: Partial<ContentProgress>) => {
  await api.post<ContentProgress>("/content_progress", {
    id_level_progress,
    id_order_level,
  });
};

export const Level = () => {
  const { id } = useParams();

  const level = useResource<LevelType>(`/level/${id}`, [id]);

  const { Modal: ModalReportComponent, openModal } = useModal({
    modal: ModalReport,
  });

  if (!id) return <NotFoundPage />;

  const levelProgress = level?.levelProgress[0];

  const content = level?.orderLevel.find((content: OrderLevel) => {
    if (!levelProgress?.contentProgress) return true;

    const isProgressIncompleted = levelProgress?.contentProgress.some(
      (progress: ContentProgress) =>
        progress.id_order_level === content.id &&
        progress.status !== "COMPLETED"
    );

    return isProgressIncompleted;
  });

  return (
    <>
      <main className="py-14 px-24 bg-primary-800 space-y-12 min-h-screen">
        <HeaderGame
          onReportCallback={openModal}
          capter={level?.capter?.numberOrder}
          level={level?.numberOrder}
        />

        <div className="space-y-4">
          <h1 className="text-primary text-4xl font-bold">
            {level?.capter?.numberOrder} - {level?.capter?.title}
          </h1>
          <div className="py-2 px-8 border-2 border-solid border-primary text-primary text-2xl inline-block rounded-2xl">
            {level?.title}
          </div>
        </div>

        {content?.activity?.length ? (
          <Activity />
        ) : (
          <Subject {...content?.subject[0]} />
        )}

        <div className="flex justify-end gap-4">
          <Link
            to="/all-capters"
            className="btn border-2 border-solid border-primary-100 text-primary-100 font-bold"
          >
            Retornar
          </Link>
          <button
            onClick={() =>
              completeContent({
                id_order_level: content?.id,
                id_level_progress: levelProgress?.id,
              })
            }
            className="btn bg-primary-600 font-bold text-primary-100"
          >
            Proximo
          </button>
        </div>
      </main>

      <ModalReportComponent />
    </>
  );
};
