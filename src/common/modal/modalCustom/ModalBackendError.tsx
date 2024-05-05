import { Modal, ModalProps } from "../Modal";

export const BackendErrorModal = ({ ...rest }: ModalProps) => {
  const { callbackClose } = rest;
  return (
    <Modal {...rest}>
      <h1 className="text-xl font-medium">Não foi possível se conectar</h1>
      <p>Por favor confira se o backend está ligado</p>
      <div className="flex sm:justify-end">
        <button
          className="px-8 py-1 rounded bg-primary-600 text-primary-100 text-base"
          onClick={callbackClose}
        >
          Ok
        </button>
      </div>
    </Modal>
  );
};
