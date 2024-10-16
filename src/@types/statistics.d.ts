import { Chapter, Level, OrderLevel } from "./game";

export type PlayerStatistics = {
  countUser: number;
  countPlayer: number;
  percentPlayerLogged: number;
  countUserFinishingGame: number;
  percentUserFinishingGame: number;
};

export type PartialGameStatistics = {
  timeForCompleat: string;
  countUserNotCompleat: number;
  percentUserCompleat: number;
  countUserCompleat: number;
};

export type ChapterStatistics = Chapter | PartialGameStatistics;
export type LevelStatistics = Level | PartialGameStatistics;
export type ContentStatistics = OrderLevel | PartialGameStatistics;
