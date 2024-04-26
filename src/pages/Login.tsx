import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../AuthContext.js";

import { Input } from "../components/Input.js";
import { api } from "../api.js";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

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
  const navigate = useNavigate()

  const callbackLogin = async (fields: LoginScheme) => {
    try {
      const response = await api.post<LoginScheme>("/login", fields);
      const { token } = response.data;
      
      // registerToken(token);
      navigate("/all-capters")
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

  return (
    <main className="h-screen w-full content-center bg-primary-100">
      <div className="form-style">
        <h1 className="title">Login</h1>
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

          <div className="space-x-4 pt-4">
            <button
              className="btn btn-primary bg-primary-600 text-primary-100 duration-300 hover:bg-primary-700"
              data-cy="login-redirect_register"
            >
              Entrar
            </button>
            <Link
              to="/register"
              className="btn btn-primary border-2 border-solid border-primary-600 text-primary-600 duration-300 hover:bg-primary-700 hover:border-primary-700 hover:text-primary-100"
              data-cy="login-save"
            >
              Cadastro
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};
