import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { api } from "../api.js";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { DivButton } from "./components/Auth/DivButton.js";
import { DivLinks } from "./components/Auth/DivLinks.js";
import { DivInput } from "../common/Input/DivInput.js";
import { InputText } from "../common/Input/inputCustomn/InputText.js";
import { InputPassword } from "../common/Input/inputCustomn/InputPassword.js";

const schema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Senhas não são iguais",
  });

type LoginScheme = z.infer<typeof schema>;

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginScheme>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const callbackRegister = async (fields: LoginScheme) => {
    try {
      const responseRegister = await api.post<LoginScheme>("/register", {
        ...fields,
        confirm_password: undefined,
      });
      const { id: id_user } = responseRegister.data;
      const response = await api.post("/player", { id_user });
      if (response) {
        navigate("/login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { data, status } = error.response;
        if (status === 409) {
          setError("email", {
            type: "customn",
            message: "Esse email já está em uso",
          });
        } else {
          const field = data.field;
          setError(field, { type: "customn", message: data.message });
        }
      }
    }
  };

  return (
    <main className="page-auth">
      <div className="form-style">
        <h1 className="title">REGISTRAR</h1>
        <form
          noValidate
          className="space-y-6 2xl:space-y-8"
          onSubmit={handleSubmit(callbackRegister)}
        >
          <div className="space-y-4 2xl:space-y-6">
            <DivInput label="E-mail" error={errors.email}>
              <InputText
                type="email"
                placeholder="Digite seu e-mail..."
                data-cy="login-email"
                {...register("email")}
              />
            </DivInput>

            <DivInput label="Senha" error={errors.password}>
              <InputPassword
                data-cy="login-password"
                {...register("password")}
              />
            </DivInput>

            <DivInput label="Confirme a Senha" error={errors.confirm_password}>
              <InputPassword
                data-cy="login-confirm_password"
                {...register("confirm_password")}
              />
            </DivInput>
          </div>

          <DivButton
            page="register"
            textCancel="LOGIN"
            textButton="CADASTRAR"
          />
          <DivLinks />
        </form>
      </div>
    </main>
  );
};
