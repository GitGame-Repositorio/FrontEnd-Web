import { UseFormReturn } from "react-hook-form";
import { Content } from "../../../@types/game";

export type ContentProps = {
  content: Content;
  children: ReactElement;
};

type PropsFormat = {
  cols: number;
  rows: number;
};

export type ContentContext = {
  canEdit: boolean;
  type: Content["type"];
  updateData: (obj: object, id: string) => void;
  updateDataFormat: (cols: number, rows: number) => void;
  getData: () => object[];
  handleEdit: () => void;
  cancelEdit: () => void;
  setType: (value: Content.type) => void;
  dataFormat: PropsFormat;
  content: Content;
};

export type ContextProps = {
  children: ReactNode;
};
