import { ComponentType, useState } from "react";
import { ModalProps } from "./Modal";

type ModalType = {
  modal: ComponentType<ModalProps>;
};

export const useModal = ({ modal: ModalComponent }: ModalType) => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const Modal = ({ ...rest }: ModalProps) => {
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
