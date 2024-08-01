import { Link, useParams, useNavigate } from "react-router-dom";
import { useResource } from "../../common/useResource";
import { Level as LevelType, OrderLevel } from "../../@types/game.d";
import { NotFoundPage } from "../NotFoundPage";
import { Activity } from "./components/Activity";
import { Subject } from "./components/Subject";
import { HeaderLevel } from "../../common/Header/HeaderLevel";
import { useModal } from "../../common/modal/useModal";
import { ModalReport } from "../../common/modal/modalCustom/ModalReport";
import { ContentProgress, LevelProgress } from "../../@types/progress.d";
import { api } from "../../api";
import { Loading } from "../Loading";
import { useState } from "react";

const completeContent = async ({
  id_level_progress,
  id_order_level,
}: Partial<ContentProgress>) => {
  await api.post<ContentProgress>("/content_progress", {
    id_level_progress,
    id_order_level,
    complete: true,
  });
  await api.post("/progress/me");
};

const findContentLevel = (
  level: LevelType | undefined,
  levelProgress: LevelProgress | undefined
): OrderLevel | undefined => {
  const { contentProgress } = levelProgress || {};
  return level?.orderLevel?.find((content: OrderLevel) => {
    if (!contentProgress) return true;

    const progressFind = contentProgress?.find(
      (progress: ContentProgress) => progress.id_order_level === content.id
    );

    return !progressFind || !progressFind?.complete;
  });
};

export const Level = () => {
  const { id } = useParams();

  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const level = useResource<LevelType>(`/level/${id}`, [id]);
  const levelProgress = useResource<LevelProgress>(
    `progress/level_progress/me?id_level=${id}&limit=1`,
    [id, count]
  );

  const { Modal: ModalReportComponent, openModal } = useModal({
    modal: ModalReport,
  });

  if (!id) return <NotFoundPage />;
  if (!level) return <Loading />;

  const content = findContentLevel(level, levelProgress);

  if (!content) {
    navigate("/all-capters");
  }

  return (
    <>
      <main className="py-14 px-24 bg-primary-800 space-y-12 min-h-screen">
        <HeaderLevel
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
            onClick={() => {
              completeContent({
                id_order_level: content?.id,
                id_level_progress: levelProgress?.id,
              });
              setCount(count + 1);
            }}
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
