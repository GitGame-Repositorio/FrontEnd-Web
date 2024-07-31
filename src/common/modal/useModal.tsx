import { ComponentType, useState } from "react";
import { ModalProps } from "./Modal";

export type ModalType = {
  modal: ComponentType;
};

type EventButton = React.SyntheticEvent<HTMLButtonElement, Event>;

export const useModal = ({ modal: ModalComponent }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = (event: EventButton) => {
    event?.preventDefault();
    setIsVisible(true);
  };

  const closeModal = (event: EventButton) => {
    event?.preventDefault();
    setIsVisible(false);
  };

  const Modal = ({ ...rest }: ModalProps): T => {
    return (
      <ModalComponent
        callbackClose={closeModal}
        isVisible={isVisible}
        {...rest}
      />
    );
  };

  return {
    closeModal,
    openModal,
    Modal,
  };
};
