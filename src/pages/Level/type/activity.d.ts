export type OptionTask = "multipleOption" | "singleOption";

type IdType = string | number;

export type TaskActivity = {
  type: OptionTask;
  question: string;
  listAlternatives: PropsAlternatives[];
  resolution: IdType | IdType[];
};

export type PropsAlternatives = {
  id: IdType;
  name: string;
};
