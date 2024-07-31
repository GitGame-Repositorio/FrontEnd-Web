import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type ModalProps = {
  isVisible?: boolean;
  children?: ReactNode;
  className?: string;
  callbackClose?: () => void;
};

export const Modal = ({
  callbackClose,
  isVisible,
  children,
  className,
}: ModalProps) => {
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
      className={`visible duration-200 ease-linear bg-primary-950 bg-opacity-50 fixed inset-0 h-screen content-center transition-modal`}
      onClick={onClickPage}
    >
      <div
        className={twMerge(
          "bg-primary-100 p-4 shadow-common rounded-xl w-[90%] max-w-lg text-primary-800 flex flex-col gap-2",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
