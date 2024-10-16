export enum StatusProgress {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  BLOCK = "BLOCK",
}

export type ChapterProgress = {
  id: string;
  id_chapter: string;
  id_user: string;
  status: StatusProgress;
  exam_complete: boolean;
  levelProgress: LevelProgress[];
};

export type LevelProgress = {
  id: string;
  id_chapter_progress: string;
  id_level: string;
  status: StatusProgress;
  chapterProgress: ChapterProgress;
  contentProgress: ContentProgress[];
};

export type ContentProgress = {
  id: string;
  id_content: string;
  id_level_progress: string;
  status: StatusProgress;
  complete: boolean;
  levelProgress: LevelProgress;
};
