import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { z } from "zod";

import { api } from "../api.js";
import { DivInput } from "../common/Input/DivInput.js";
import { DivButton } from "./components/Auth/DivButton.js";
import { InputPassword } from "../common/Input/inputCustom/InputPassword.js";

const schema = z
  .object({
    password: z.string(),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Senhas não são iguais",
  });

type PropsScheme = z.infer<typeof schema>;

export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PropsScheme>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const callbackSubmit = async (fields: PropsScheme) => {
    try {
      const { password } = fields;
      const response = await api.post<PropsScheme>("/change-password", {
        password,
      });
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { data } = error.response;
        const { field, message } = data
        setError(field, { type: "customn", message });
      }
    }
  };

  return (
    <main className="page-auth">
      <div className="form-style">
        <h1 className="title">RECUPERAÇÃO DE CONTA</h1>
        <form
          noValidate
          className="space-y-6 2xl:space-y-8"
          onSubmit={handleSubmit(callbackSubmit)}
        >
          <div className="space-y-4 2xl:space-y-6">
            <DivInput label="Senha" error={errors.password}>
              <InputPassword key="password" {...register("password")} />
            </DivInput>

            <DivInput label="Confirme a Senha" error={errors.confirm_password}>
              <InputPassword
                key="confirm_password"
                {...register("confirm_password")}
              />
            </DivInput>
          </div>

          <DivButton
            linkCancel="/login"
            textCancel="CANCELAR"
            textButton="RECUPERAR"
          />
        </form>
      </div>
    </main>
  );
};
