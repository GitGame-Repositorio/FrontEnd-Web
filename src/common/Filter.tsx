import { MdFilterList } from "react-icons/md";
import {
  ModalMultipleChoice,
  ModalMultipleChoiceProps,
} from "./modal/modalCustom/ModalMultipleChoice";
import { useModal } from "./modal/useModal";
import theme from "../service/tailwindTheme";

type PropsFilter = {
  callbackUpdate: (filter: PropsFilter[]) => PropsFilter[];
  list: PropsFilter[];
};

export const Filter = ({ list, callbackUpdate }: PropsFilter) => {
  const { openModal, Modal: ModalFilter } = useModal<ModalMultipleChoiceProps>({
    modal: ModalMultipleChoice,
  });
  return (
    <>
      <button
        className="p-3 min-h-12 min-w-12 content-center bg-primary-600 rounded-xl"
        onClick={openModal}
      >
        <MdFilterList size={24} color={theme.colors.primary[50]} />
      </button>
      <ModalFilter
        listValues={list}
        title="Adicionar Filtros"
        updateSelect={callbackUpdate}
      />
    </>
  );
};
