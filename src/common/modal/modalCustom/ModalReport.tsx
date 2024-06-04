import { useAuth } from "../../../AuthContext";
import { api } from "../../../api";
import { Modal, ModalProps } from "../Modal";

export const ModalReport = ({ ...rest }: ModalProps) => {
  const { user } = useAuth()

  const callbackSend = async () => {
    const text = document.querySelector("#report-problem")?.textContent
    const response = await api.post("/reports", { text, player_id: user?.id })
    const report = await response.data
    if (report.id) {
      console.log("sucesso")
    }
  }

  return (
    <Modal {...rest}>
      <h1 className="text-2xl font-medium">Encontrou algum error?</h1>
      <p>Pedimos que descreva sobre, para que assim possa ser corrigido</p>
      <textarea
        placeholder="Relate o problema aqui..."
        className="input input-textarea resize-none"
        id="report-problem"
      ></textarea>
      <div className="flex sm:justify-end">
        <button
          className="px-8 py-2 rounded bg-primary-600 text-primary-100 text-base font-bold"
          onClick={callbackSend}
        >
          Enviar
        </button>
      </div>
    </Modal>
  );
};
