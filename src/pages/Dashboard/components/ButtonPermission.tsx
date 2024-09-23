import {
  ModalMultipleChoice,
  ModalMultipleChoiceProps,
  PropsFilter,
} from "../../../common/modal/modalCustom/ModalMultipleChoice";
import { useModal } from "../../../common/modal/useModal";

export const ButtonPermission = ({
  list,
  updateList,
}: {
  list: PropsFilter;
}) => {
  const { Modal: ModalPermission, openModal } =
    useModal<ModalMultipleChoiceProps>({
      modal: ModalMultipleChoice,
    });

  return (
    <>
      <button
        className="btn rounded-lg w-2/6 text-base bg-primary-600 hover:bg-primary-700 text-primary-100 uppercase"
        onClick={openModal}
      >
        Editar Permissões
      </button>
      <ModalPermission
        listValues={list}
        updateSelect={setList}
        title="Permissões"
      />
    </>
  );
};
