import { Button } from "../../Button/ButtonCustomn/Button";
import { Modal, ModalProps } from "../Modal";

export const BackendErrorModal = ({ ...rest }: ModalProps) => {
  const { callbackClose } = rest;
  return (
    <Modal {...rest} title="Error de conexão">
      <h2 className="text-lg font-medium">Não foi possível se conectar</h2>
      <p>Por favor confira se o backend está ligado</p>
      <div className="flex sm:justify-end">
        <Button className="py-2.5 w-2/6" onClick={callbackClose}>
          Ok
        </Button>
      </div>
    </Modal>
  );
};
