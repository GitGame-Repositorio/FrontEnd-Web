export enum StatusProgress {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export type CapterProgress = {
  id: string;
  id_capter: string;
  id_user: string;
  status: StatusProgress;
  exam_complete: boolean;
  levelProgress: LevelProgress[];
};

export type LevelProgress = {
  id: string;
  id_capter_progress: string;
  id_level: string;
  status: StatusProgress;
  capterProgress: CapterProgress[];
  contentProgress: ContentProgress[];
};

export type ContentProgress = {
  id: string;
  id_order_level: string;
  id_level_progress: string;
  status: StatusProgress;
  complete: boolean;
  levelProgress: LevelProgress[];
};
