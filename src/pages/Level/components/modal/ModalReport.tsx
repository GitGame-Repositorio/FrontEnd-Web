import { useForm } from "react-hook-form";
import { useAuth } from "../../../../AuthContext";
import { api } from "../../../../api";
import { DivCustomButton } from "../../../../common/Button/DivCustomButton";
import { DivInput } from "../../../../common/Input/DivInput";
import { InputText } from "../../../../common/Input/inputCustom/InputText";
import { Modal, ModalProps } from "../../../../common/modal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Report } from "../../../../@types/game";
import { useContent } from "../../context/ContentContext";

const scheme = z.object({
  title: z.string().max(255),
  description: z.string(),
});

type PropsReport = z.infer<typeof scheme>;

export const ModalReport = ({ ...rest }: ModalProps) => {
  const { callbackClose } = rest;
  const { user } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PropsReport>({
    resolver: zodResolver(scheme),
  });

  const { content } = useContent();

  const callbackSend = async (fields: Partial<Report>) => {
    await api.post("/reports", {
      ...fields,
      id_user: user?.id,
      id_content: content?.id,
    });
    callbackClose?.();
  };

  const inputClass = "bg-primary-200 placeholder:font-medium text-sm";
  const labelClass = "text-base";
  const divClass = "space-y-1";

  return (
    <Modal {...rest} title="Reportar erro">
      <form className="space-y-5" onSubmit={handleSubmit(callbackSend)}>
        <DivInput
          error={errors.title}
          label="Título"
          className={divClass}
          labelClassName={labelClass}
        >
          <InputText
            className={inputClass}
            placeholder="Digite o titulo aqui"
            {...register("title")}
          />
        </DivInput>

        <DivInput
          error={errors.description}
          label="Digite abaixo o problema"
          className={divClass}
          labelClassName={labelClass}
        >
          <textarea
            placeholder="Digite o problema..."
            className={`input input-textarea resize-none ${inputClass}`}
            {...register("description")}
          ></textarea>
        </DivInput>

        <DivCustomButton textMain="Enviar" callbackClose={callbackClose} />
      </form>
    </Modal>
  );
};
