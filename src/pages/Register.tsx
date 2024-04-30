import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../common/Input";
import { api } from "../api.js";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { DivButton } from "./components/Login/DivButton";
import { Header } from "./components/Login/Header"

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

  const callbackLogin = async (fields: LoginScheme) => {
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
        <Header title="Registrar" />
        <form
          noValidate
          className="space-y-2"
          onSubmit={handleSubmit(callbackLogin)}
        >
          <Input
            max="125"
            type="text"
            label="Name"
            data-cy="login-name"
            error={errors.name}
            {...register("name")}
          />

          <Input
            max="125"
            type="email"
            label="E-mail"
            data-cy="login-email"
            error={errors.email}
            {...register("email")}
          />

          <Input
            max="125"
            label="Senha"
            type="password"
            data-cy="login-password"
            error={errors.password}
            {...register("password")}
          />

          <Input
            max="125"
            label="Confirme a Senha"
            type="password"
            data-cy="login-confirm_password"
            error={errors.confirm_password}
            {...register("confirm_password")}
          />

          <DivButton
            page="register"
            textCancel="Cancelar"
            textButton="Cadastrar"
          />
        </form>
      </div>
    </main>
  );
};
