import { ReactNode } from "react";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import theme from "../../service/tailwindTheme";

export type ModalProps = {
  isVisible?: boolean;
  children?: ReactNode;
  className?: string;
  title?: string;
  callbackClose?: () => void;
};

export const Modal = ({
  callbackClose,
  isVisible,
  children,
  title,
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
        {title && (
          <>
            <div className="flex justify-between gap-2 w-full">
              <p className="font-medium">{title}</p>
              <MdClose
                size={22}
                className="cursor-pointer"
                color={theme.colors.primary[600]}
                onClick={callbackClose}
              />
            </div>
            <hr className="line-custom" />
          </>
        )}
        {children}
      </div>
    </div>
  );
};
