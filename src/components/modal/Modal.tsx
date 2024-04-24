import { ReactNode } from "react";

export type ModalProps = {
  isVisible?: boolean;
  children?: ReactNode;
  callbackClose?: () => void;
};

export const Modal = ({ callbackClose, isVisible, children }: ModalProps) => {
  if (!isVisible) return null;

  const onClickPage = (event: React.MouseEvent<HTMLElement>) => {
    const elementClick = event.target;
    const elementName = elementClick.getAttribute("name");
    if (elementName === "modal-page") {
      callbackClose?.();
    }
  };

  return (
    <div
      name="modal-page"
      className={`modal-page opacity-100 visible duration-200 ease-linear bg-gray-600 opacity-65 fixed inset-0 h-screen content-center transition-modal`}
      onClick={onClickPage}
    >
      <div className="bg-white p-4 gap-2 shadow-common rounded-xl w-[90%] max-w-lg text-primary-950 flex flex-col gap-1.5">
        {children}
      </div>
    </div>
  );
};
