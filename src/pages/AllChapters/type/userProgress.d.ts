import { ChapterRemap } from "./remap";

export type ChapterRemap = {
  percentChapter: number;
  chapterProgress: ChapterProgress;
};

export type UserProgress = {
  completeGamePercentage: number;
  allChapterRemap: ChapterRemap[];
};
