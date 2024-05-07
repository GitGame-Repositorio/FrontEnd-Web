import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { z } from "zod";

import { api } from "../../api";
import { useAuth } from "../../AuthContext";
import { DivInput } from "../../common/Input/DivInput";
import { DivLinks } from "./components/DivLinks";
import { DivButton } from "./components/DivButton";
import { InputText } from "../../common/Input/inputCustom/InputText";
import { InputPassword } from "../../common/Input/inputCustom/InputPassword";
import { schemaPassword, schemeEmail } from "../../common/zodScheme";

const schema = z.object({
  email: schemeEmail,
  password: schemaPassword,
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

  return (
    <main className="page-auth">
      <div className="form-style">
        <h1 className="title">LOGIN</h1>

        <form
          noValidate
          className="space-y-6 md:space-y-8"
          onSubmit={handleSubmit(callbackLogin)}
        >
          <div className="space-y-4 2xl:space-y-6">
            <DivInput label="E-mail" error={errors.email}>
              <InputText
                type="email"
                placeholder="Digite seu e-mail..."
                {...register("email")}
              />
            </DivInput>

            <DivInput label="Senha" error={errors.password}>
              <InputPassword {...register("password")} />
            </DivInput>
          </div>

          <DivButton
            linkCancel="/register"
            textCancel="CADASTRAR"
            textButton="ENTRAR"
          />
          <DivLinks />
        </form>
      </div>
    </main>
  );
};
