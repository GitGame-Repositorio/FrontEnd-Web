import { CapterProgress } from "./progress";

export type CapterRemap = {
  percentCapter: number;
  capterProgress: CapterProgress;
};

export type UserProgress = {
  completeGamePercentage: number;
  allCapterRemap: CapterRemap[];
};
