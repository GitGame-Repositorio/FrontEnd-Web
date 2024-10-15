import { Content } from "../../../@types/game";

export type ContentProps = {
  content: Content;
  children: ReactElement;
};

export type ContentContext = {
  canEdit: boolean;
  type: Content.type;
  handleEdit: () => void;
  cancelEdit: () => void;
  setType: (value: Content.type) => void;
  content: Content;
};

export type ContextProps = {
  children: ReactNode;
};
