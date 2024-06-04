import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { z } from "zod";

import { api } from "../../api.js";
import { DivInput } from "../../common/Input/DivInput.js";
import { DivLinks } from "./components/DivLinks.js";
import { DivButton } from "./components/DivButton.js";
import { InputText } from "../../common/Input/inputCustom/InputText.js";
import { InputPassword } from "../../common/Input/inputCustom/InputPassword.js";
import { schemaPassword, schemeEmail } from "../../common/zodScheme.js";
import { useAuth } from "../../AuthContext.js";

const schema = z
  .object({
    email: schemeEmail,
    password: schemaPassword,
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Senhas não são iguais",
  });

type RegisterScheme = z.infer<typeof schema>;

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterScheme>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const { login } = useAuth()

  const callbackRegister = async (fields: RegisterScheme) => {
    try {
      const response = await api.post<RegisterScheme>("/register", {
        ...fields,
        confirm_password: undefined,
      });
      const { token } = response.data
      if (token) {
        login(token)
        navigate("/login");
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.name === "AxiosError") {
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
                value={undefined}
                placeholder="Digite seu e-mail..."
                {...register("email")}
              />
            </DivInput>

            <DivInput label="Senha" error={errors.password}>
              <InputPassword {...register("password")} />
            </DivInput>

            <DivInput label="Confirme a Senha" error={errors.confirm_password}>
              <InputPassword {...register("confirm_password")} />
            </DivInput>
          </div>

          <DivButton
            linkCancel="/login"
            textCancel="LOGIN"
            textButton="CADASTRAR"
          />
          <DivLinks />
        </form>
      </div>
    </main>
  );
};
