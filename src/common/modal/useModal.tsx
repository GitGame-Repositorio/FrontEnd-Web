import { ComponentType, useState } from "react";
import { ModalProps } from "./Modal";

export type ModalType<T = {}> = {
  modal: ComponentType<T>;
};

type EventButton = React.SyntheticEvent<HTMLButtonElement, Event>;

export const useModal = <T,>({ modal: ModalComponent }: ModalProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = (event: EventButton) => {
    event?.preventDefault();
    setIsVisible(true);
  };

  const closeModal = (event: EventButton): void => {
    event?.preventDefault();
    setIsVisible(false);
  };

  const Modal = (props: T) => {
    return (
      <ModalComponent
        callbackClose={closeModal}
        isVisible={isVisible}
        {...props}
      />
    );
  };

  return {
    closeModal,
    openModal,
    Modal,
  };
};
