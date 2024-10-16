import { useNavigate } from "react-router-dom";

import { ModalReport } from "../modal/ModalReport";
import { HeaderLevel } from "../../../../common/Header/HeaderLevel";
import { useResource } from "../../../../common/useResource";
import { useModal } from "../../../../common/modal/useModal";
import { completeContent, findContentLevel } from "../../service/services";

import { Chapter, Content, Level } from "../../../../@types/game";
import { ContentProgress, LevelProgress } from "../../../../@types/progress";
import { api } from "../../../../api";
import { Button } from "../../../../common/Button/ButtonCustomn/Button";
import { useAuth } from "../../../../AuthContext";
import { ButtonOutline } from "../../../../common/Button/ButtonCustomn/ButtonOutline";
import { ContentProps } from "../../type/content";
import { useContent } from "../../context/ContentContext";
import { ModalProps } from "../../../../common/modal/Modal";

const updateUrlContent = async (
  level: Level | undefined,
  navigate: (value: string) => void
) => {
  const listLevelProgress: LevelProgress[] = await api.get(
    `progress/level_progress/me?id_level=${level?.id}`
  );
  const levelProgress = listLevelProgress?.data[0];
  const content = findContentLevel(level, levelProgress);

  if (!content) {
    return navigate("/all-capters");
  }

  navigate(`/content/${content.id}`);
};

type Props = {
  content: Content;
  level: Level | undefined;
  progress: ContentProgress | undefined;
  navigate: (value: string) => void;
};

const submit = async ({ progress, content, level, navigate }: Props) => {
  try {
    !progress?.complete &&
      (await completeContent({
        id_content: content?.id,
        id_level_progress: progress?.id_level_progress,
      }));
  } catch (e) {
    if (e.response.status !== 409) throw new Error("not status 409");
  }
  await updateUrlContent(level, navigate);
};

export const ContentView = ({ content, children }: ContentProps) => {
  const level = useResource<Level>(`/level/${content?.id_level}`);
  const chapter = useResource<Chapter>(`/chapter/${content?.level.id_chapter}`);
  const listProgress = useResource<ContentProgress[]>(
    `progress/content_progress/me?id_content=${content?.id}`,
    [content?.id]
  );

  const { user } = useAuth();

  const navigate = useNavigate();

  const progress = listProgress?.find((obj) => !!obj);

  const { handleEdit } = useContent();

  const { Modal: ModalReportComponent, openModal } = useModal<ModalProps>({
    modal: ModalReport,
  });

  return (
    <>
      <main className="py-8 flex-1 container flex flex-col justify-between">
        <div className="space-y-10">
          <HeaderLevel
            onReportCallback={openModal}
            chapter={chapter?.numberOrder}
            level={level?.numberOrder}
          />

          <div className="space-y-4">
            <h1 className="text-primary-600 text-4xl font-bold">
              {chapter?.numberOrder} - {chapter?.title}
            </h1>
            <div className="py-2 px-8 border-2 border-solid border-primary-600 text-primary-600 text-2xl inline-block rounded-2xl">
              {level?.title}
            </div>
          </div>

          {children}
        </div>

        <div className="flex justify-between gap-4">
          <div>
            {user?.admin?.canManageContentGame && (
              <Button className="w-max font-bold" onClick={handleEdit}>
                Editar
              </Button>
            )}
          </div>
          <div className="flex self-end gap-4">
            <ButtonOutline
              to="/all-capters"
              className="border-2 normal-case font-bold"
            >
              Retornar
            </ButtonOutline>
            <Button
              onClick={() => submit({ level, content, navigate, progress })}
              className="normal-case font-bold"
            >
              Proximo
            </Button>
          </div>
        </div>
      </main>

      <ModalReportComponent />
    </>
  );
};
