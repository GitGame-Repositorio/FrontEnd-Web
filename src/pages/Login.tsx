import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../AuthContext";

import { Input } from "../common/Input";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { DivButton } from "./components/Login/DivButton";
import { Header } from "./components/Login/Header";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginScheme = z.infer<typeof schema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginScheme>({ resolver: zodResolver(schema) });

  const { login: registerToken } = useAuth();
  const navigate = useNavigate();

  const callbackLogin = async (fields: LoginScheme) => {
    try {
      const response = await api.post<LoginScheme>("/login", fields);
      const { token } = response.data;

      // registerToken(token);
      navigate("/all-capters");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          const config = {
            type: "customn",
            message: "Usuário ou senha incorreto",
          };
          setError("email", config);
          setError("password", config);
        }
      }
    }
  };
<h1 className="title">Login</h1>
  return (
    <main className="page-auth">
      <div className="form-style">
        <Header title="Login" />

        <form
          noValidate
          className="space-y-2"
          onSubmit={handleSubmit(callbackLogin)}
        >
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

          <DivButton page="login" textCancel="Cadastro" textButton="Entrar" />
        </form>
      </div>
    </main>
  );
};
