import { ChapterProgress } from "./progress";

export type ChapterRemap = {
  percentChapter: number;
  chapterProgress: ChapterProgress;
};

export type UserProgress = {
  completeGamePercentage: number;
  allChapterRemap: ChapterRemap[];
};
