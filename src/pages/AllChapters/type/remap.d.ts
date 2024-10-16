import { Chapter, Level, OrderLevel } from "../../../@types/game";
import {
  ChapterProgress,
  ContentProgress,
  LevelProgress,
} from "../../../@types/progress";

type PropsLevel = {
  content: ContentRemap;
  percentLevel: number;
};

type PropsChapter = {
  level: LevelRemap[];
};

export type ChapterRemap = Chapter & ChapterProgress & PropsChapter;
export type LevelRemap = Level & LevelProgress & PropsLevel;
export type ContentRemap = OrderLevel & ContentProgress;
