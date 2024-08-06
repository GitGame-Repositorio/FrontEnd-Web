import { ChapterProgress, LevelProgress } from "./progress";

export type Chapter = {
  id: string;
  title: string;
  numberOrder: number;
  level: Level[];
  playerProgress: ChapterProgress[];
};

export type OrderLevel = {
  id: string;
  order: number;
  id_level: string;
  activity: Activity[];
  subject: Subject[];
};

export type Level = {
  id: string;
  title: string;
  numberOrder: number;
  id_chapter: string;
  chapter: Chapter;
  orderLevel: OrderLevel[];
  levelProgress: LevelProgress[];
};

type Assessment = {
  id: string;
  title: string;
  objective: Objective;
};

export type Activity = {
  id_assessment: string;
  id_orderLevel: string;
  assessment: Assessment;
};

export type Exam = {
  id_assessment: string;
  id_chapter: string;
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

export type Report = {
  id: string;
  id_user: string;
  title: string;
  description: string;
  status: ReportStatus;
};

export enum ReportStatus {
  OPENED = "OPENED",
  CLOSED = "CLOSED",
  RESOLVED = "RESOLVED",
}
