import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { z } from "zod";

import { InputText } from "../../common/Input/inputCustom/InputText";
import { DivButton } from "./components/DivButton";
import { DivInput } from "../../common/Input/DivInput";
import { vocabulary } from "../../translator";
import { api } from "../../api";
import { Message } from "../../common/Message";
import { schemeEmail } from "../../common/zodScheme";

const schema = z.object({ email: schemeEmail });

type PropsScheme = z.infer<typeof schema>;

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PropsScheme>({ resolver: zodResolver(schema) });

  const [messageVisible, setMessageVisible] = useState(false);

  const callbackSubmit = async (fields: PropsScheme) => {
    try {
      const response = await api.post<PropsScheme>("/send-email", fields);
      if (response.status === 200) setMessageVisible(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError("email", {
          type: "customn",
          message: vocabulary[error.response?.data],
        });
      }
    }
  };

  return (
    <main className="page-auth">
      <div className="relative w-full h-full content-center">
        <div className="form-style">
          <span className="text-center space-y-4">
            <h1 className="title">RECUPERAÇÃO DE C0NTA</h1>
            <h2 className="text-xl font-medium">
              Digite o e-mail de verificação
            </h2>
          </span>

          <form
            noValidate
            className="space-y-6 md:space-y-8"
            onSubmit={handleSubmit(callbackSubmit)}
          >
            <DivInput label="E-mail" error={errors.email}>
              <InputText
                type="email"
                placeholder="Digite seu e-mail..."
                {...register("email")}
              />
            </DivInput>

            <DivButton
              linkCancel="/login"
              textCancel="CANCELAR"
              textButton="ENVIAR"
            />
          </form>
        </div>
        {messageVisible && (
          <Message
            className="-bottom-24 xl:-bottom-20 2xl:-bottom-28"
            text="Código enviado com sucesso!"
          />
        )}
      </div>
    </main>
  );
};
