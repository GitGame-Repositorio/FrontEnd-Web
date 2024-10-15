import { ContentProgress, LevelProgress } from "../../../@types/progress.d";
import { Content, Level as LevelType } from "../../../@types/game.d";
import { api } from "../../../api";

export const completeContent = async ({
  id_level_progress,
  id_content,
}: Partial<ContentProgress>) => {
  await api.post<ContentProgress>("/content_progress", {
    id_level_progress,
    complete: true,
    id_content,
  });
  await api.post("/progress/me");
};

export const findContentLevel = (
  level: LevelType | undefined,
  levelProgress: LevelProgress | undefined
): Content | undefined => {
  const { contentProgress } = levelProgress || {};
  return level?.content?.find((content: Content) => {
    if (!contentProgress) return true;

    const progressFind = contentProgress?.find(
      (progress: ContentProgress) => progress.id_content === content.id
    );

    return !progressFind || !progressFind?.complete;
  });
};
