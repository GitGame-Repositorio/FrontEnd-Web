import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../common/Input";
import { api } from "../api.js";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { DivButton } from "./components/Login/DivButton";
import { Header } from "./components/Login/Header";
import { DivLinks } from "./components/Login/DivLinks.js";

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
        <h1 className="title">LOGIN</h1>
        <form
          noValidate
          className="space-y-6 2xl:space-y-8"
          onSubmit={handleSubmit(callbackLogin)}
        >
          <div className="space-y-4 2xl:space-y-6">
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
