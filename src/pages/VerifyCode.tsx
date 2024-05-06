import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { z } from "zod";

import { InputCode } from "../common/Input/inputCustom/InputCode";
import { DivButton } from "./components/Auth/DivButton";
import { DivInput } from "../common/Input/DivInput";
import { api } from "../api";

const schema = z.object({ code: z.number().min(0).max(9) });

type PropsScheme = z.infer<typeof schema>;

export const VerifyCode = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PropsScheme>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const callbackSubmit = async (fields: PropsScheme) => {
    try {
      console.log(fields)
      const response = await api.post<PropsScheme>("/verify-code", fields);
      if (response.status === 200)
        navigate("/change-password?token=" + response.data.token);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError("code", {
          type: "customn",
          message: "Código incorreto",
        });
      }
    }
  };

  return (
    <main className="page-auth">
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
          <DivInput label="Código" error={errors.code}>
            <InputCode count={6} {...register("code")} />
          </DivInput>

          <DivButton
            linkCancel="/login"
            textCancel="CANCELAR"
            textButton="CONFIRMAR"
          />
        </form>
      </div>
    </main>
  );
};
