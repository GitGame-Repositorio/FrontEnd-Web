import { Modal, ModalProps } from "../Modal";
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
  callbackSuccess,
  ...rest
}: ModalChoiceProps & ModalProps) => {
  const { callbackClose } = rest;

  const classBtnOutline =
    "text-primary-500 border-primary-500 hover:bg-primary-500 hover:text-primary-100";

  return (
    <Modal {...rest} className="w-96 font-medium gap-4">
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
