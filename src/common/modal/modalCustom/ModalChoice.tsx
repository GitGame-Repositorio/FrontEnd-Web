import { ReactElement } from "react";
import { Modal, ModalProps } from "../Modal";
import { MdClose } from "react-icons/md";
import theme from "../../../service/tailwindTheme";
import { DivButton } from "../../Button/DivButton";
import { ButtonOutline } from "../../Button/ButtonCustomn/ButtonOutline";
import { Button } from "../../Button/ButtonCustomn/Button";

export type ModalChoiceProps = {
  text: string;
  title: string;
  callbackSuccess: () => void;
};

export const ModalChoice = ({
  text,
  title,
  callbackSuccess,
  ...rest
}: ModalChoiceProps & ModalProps) => {
  const { callbackClose } = rest;

  const classBtnOutline =
    "text-primary-500 border-primary-500 hover:bg-primary-500 hover:text-primary-100";

  return (
    <Modal {...rest} className="w-96 font-medium gap-5">
      <div className="space-y-2.5">
        <div className="flex justify-between">
          <p className="text-sm">{title}</p>
          <MdClose
            size={22}
            className="cursor-pointer"
            color={theme.colors.primary[600]}
            onClick={callbackClose}
          />
        </div>
        <hr className="line-custom" />
      </div>

      <p className="font-normal text-center">{text}</p>

      <DivButton>
        <>
          <ButtonOutline onClick={callbackClose} className={classBtnOutline}>
            Não
          </ButtonOutline>
          <Button
            onClick={() => {
              callbackSuccess();
              callbackClose?.();
            }}
          >
            Sim
          </Button>
        </>
      </DivButton>
    </Modal>
  );
};
