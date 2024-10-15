import {
  ModalUniqueChoice,
  ModalUniqueChoiceProps,
} from "../../../../../common/modal/modalCustom/ModalUniqueChoice";
import { useModal } from "../../../../../common/modal/useModal";
import { listActivityItem } from "../../../service/data";

export type ComponentProps = {
  openModal?: () => void;
};

type Props = {
  component: (props: ComponentProps) => JSX.Element;
  updateComponent: (obj: Props["component"]) => void;
  resetComponent: () => void;
};

export const EditItem = ({
  component: Component,
  updateComponent,
  resetComponent,
}: Props) => {
  const { Modal, openModal } = useModal<ModalUniqueChoiceProps>({
    modal: ModalUniqueChoice,
  });
  return (
    <>
      <Component openModal={openModal} />
      <Modal
        title="Selecione o tipo de item"
        listValues={listActivityItem}
        updateSelect={(obj) => updateComponent(obj.component)}
      />
    </>
  );
};
