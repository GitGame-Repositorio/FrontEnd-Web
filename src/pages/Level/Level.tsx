import { useParams, useNavigate, Navigate } from "react-router-dom";

import { useResource } from "../../common/useResource";
import { findContentLevel } from "./service/services";
import { NotFoundPage } from "../NotFoundPage";
import { Loading } from "../Loading";

import { Level as LevelType } from "../../@types/game.d";
import { LevelProgress } from "../../@types/progress.d";

export const Level = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const level = useResource<LevelType>(`/level/${id}`, [id]);
  const levelProgress = useResource<LevelProgress>(
    `progress/level_progress/me?id_level=${id}&limit=1`,
    [id]
  );

  if (!id) return <NotFoundPage />;
  if (!level) return <Loading />;

  const content = findContentLevel(level, levelProgress);

  if (!content) {
    navigate("/all-chapters");
  }

  return <Navigate to={`/content/${content?.id}`} />;
};
