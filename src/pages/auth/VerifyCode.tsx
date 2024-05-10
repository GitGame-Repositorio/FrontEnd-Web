import { useNavigate, useSearchParams } from "react-router-dom";

import { InputCode } from "../../common/Input/inputCustom/InputCode";
import { DivButton } from "./components/DivButton";
import { DivInput } from "../../common/Input/DivInput";
import { api } from "../../api";
import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";

type PropsCode = {
  value: string;
};

export const VerifyCode = () => {
  const [error, setError] = useState({});

  const codeRef = useRef<PropsCode>();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const key = searchParams.get("key");

  useEffect(() => {
    const main = async () => {
      try {
        if (!key) return navigate("/login");
        const response = await api.post(`/key-exists`, { key });
        if (!response.data.verifyCode) throw new Error();
      } catch (error) {
        navigate("/login");
      }
    };

    main();
  }, []);

  const callbackSubmit = async (e) => {
    try {
      e.preventDefault();
      const code = codeRef.current.value;

      if (!code) return setError({ message: "Necessário repassar o código" });
      else if (String(code).length < 6)
        return setError({
          message: "Necessário repassar o código por completo",
        });

      const response = await api.post<PropsCode>("/verify-code", { code, key });

      if (response.status === 200)
        navigate("/change-password?key=" + response.data.key);
    } catch (err) {
      const error = err as AxiosError;
      if (error.name === "AxiosError") {
        setError({
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
          onSubmit={callbackSubmit}
        >
          <DivInput label="Código" error={error}>
            <InputCode count={6} ref={codeRef} />
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
