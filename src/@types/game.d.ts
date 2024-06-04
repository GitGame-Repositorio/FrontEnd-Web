import { CapterProgress } from "./progress";

export type GroupCapter = {
  titleGroup: string;
  listCapter: Capter[];
};

export type Capter = {
  id: string;
  title: string;
  numberOrder: number;
  level: Level[];
  playerProgress: CapterProgress[];
};

export type Level = {
  id: string;
  title: string;
  numberOrder: number;
  id_capter: string;
};

export type Activity = {
  id_assessment: string;
  id_orderLevel: string;
};

export type Exam = {
  id_assessment: string;
  id_capter: string;
  description: string;
};

export type Objective = {
  id: string;
  id_assessment: string;
  resolution: string;
  objective: string;
};

export type Subject = {
  id: string;
  id_orderLevel: string;
  title: string;
  text: string;
};

export type Reports = {
  id: string;
  id_user: string;
  text: string;
  resolved: boolean;
};
