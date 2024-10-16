import { User } from "./auth";
import { ChapterProgress, LevelProgress } from "./progress";

export type Chapter = {
  id: string;
  title: string;
  numberOrder: number;
  level: Level[];
  playerProgress: ChapterProgress[];
};

export type ContentType = "subject" | "activity";

export type OrderLevel = {
  id: string;
  level: Level;
  title: string;
  id_level: string;
  complete: boolean;
  id_content: string;
  numberOrder: number;
  type: ContentType;
};

export type Content = OrderLevel;

export type Level = {
  id: string;
  title: string;
  numberOrder: number;
  id_chapter: string;
  chapter: Chapter;
  content: Content[];
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
  content: Content;
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
  id_content: string;
  // content: Content;
  title: string;
  text: string;
} & Content;

export type Report = {
  id: string;
  id_user: string;
  title: string;
  user: User;
  description: string;
  status: ReportStatus;
};

export enum ReportStatus {
  OPENED = "OPENED",
  CLOSED = "CLOSED",
  RESOLVED = "RESOLVED",
  REMOVED = "REMOVED",
}
