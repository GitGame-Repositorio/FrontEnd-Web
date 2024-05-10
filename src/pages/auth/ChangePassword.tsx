import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { z } from "zod";

import { api } from "../../api.js";
import { DivInput } from "../../common/Input/DivInput.js";
import { DivButton } from "./components/DivButton.js";
import { InputPassword } from "../../common/Input/inputCustom/InputPassword.js";
import { schemaPassword } from "../../common/zodScheme.js";
import { useEffect } from "react";

const schema = z
  .object({
    password: schemaPassword,
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
  const [searchParams] = useSearchParams();
  const key = searchParams.get("key");

  useEffect(() => {
    const main = async () => {
      try {
        if (!key) return navigate("/login");
        const response = await api.post(`/key-exists`, { key });
        if (!response.data.chagePass) throw new Error();
      } catch (error) {
        navigate("/login");
      }
    };

    main();
  }, []);

  const callbackSubmit = async (fields: PropsScheme) => {
    try {
      const { password } = fields;
      const response = await api.post<PropsScheme>("/change-password", {
        key,
        password,
      });
      if (response.status === 203) {
        navigate("/login");
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.name === "AxiosError") {
        const data = error.response?.request.response;
        setError("password", { type: "customn", message: data });
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
              <InputPassword {...register("password")} />
            </DivInput>

            <DivInput label="Confirme a Senha" error={errors.confirm_password}>
              <InputPassword {...register("confirm_password")} />
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
