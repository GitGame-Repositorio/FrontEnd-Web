import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaPen } from "react-icons/fa";

import { User } from "../../@types/auth.d";
import { DivInput } from "../../common/Input/DivInput";
import { InputText } from "../../common/Input/inputCustom/InputText";
import { DivRawInput } from "../../common/Input/DivRawInput";
import { PowerSelect } from "../../common/Input/inputCustom/PowerSelect";
import { Checkbox } from "../../common/Input/inputCustom/Checkbox";
import { DivButton } from "../auth/components/DivButton";
import { UserSchemeType, userSchema } from "./userSchema";
import { VITE_API_URL } from "../../env";

import theme from "../../service/tailwindTheme";
import { useState } from "react";

type Props = {
  user: User;
  submit: () => void;
};

export const UserForm = ({ user, submit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemeType>({
    defaultValues: user,
    resolver: zodResolver(userSchema),
  });

  const imgUrl = VITE_API_URL + user?.picture;
  const [canEdit, setCanEdit] = useState(false);

  const classInput =
    "bg-primary-200 border border-solid border-primary-600 focus:outline-primary-400";

  return (
    <form
      className="min-h-screen container flex flex-col justify-between gap-12 pb-24 sm:pb-12"
      onSubmit={handleSubmit(submit)}
      noValidate
    >
      <div className="pt-8 space-y-6">
        <div className="space-y-5">
          <h2 className="text-xl font-bold">Foto de Perfil</h2>
          <div className="flex gap-8 items-center">
            <img src={imgUrl} alt="Perfil" className="h-15 w-15 rounded-full" />

            {canEdit && (
              <div className="font-medium leading-tight flex gap-4">
                <button className="btn w-32 uppercase border border-solid border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-primary-100">
                  Remover
                </button>
                <button className="btn w-32 uppercase bg-primary-600 text-primary hover:bg-primary-700">
                  Upload
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <DivInput label="Nome" error={errors.name}>
            <InputText
              placeholder="Digite seu nome..."
              className={classInput}
              disabled={!canEdit}
              {...register("name")}
            />
          </DivInput>

          <DivInput label="Email" error={errors.email}>
            <InputText
              placeholder="Digite seu email..."
              className={classInput}
              disabled={!canEdit}
              {...register("email")}
            />
          </DivInput>

          <DivRawInput
            label="Profissão"
            description="Adicione sua(s) área(s) de atuação (Limite de 3)"
            error={errors?.work}
          >
            <PowerSelect
              list={["Professor", "Estudante", "Desenvolvedor", "QA"]}
              text="Profissão"
              disabled={!canEdit}
              {...register("language")}
            />
            {/* <MultipleChoice
              list={["Professor", "Estudante", "Desenvolvedor", "QA"]}
              disabled={!canEdit}
              {...register("work")}
            /> */}
          </DivRawInput>

          <DivRawInput
            label="Linguagem"
            description="Customize qual linguagem você quer ver"
            error={errors.language}
          >
            <PowerSelect
              list={["Português", "Inglês"]}
              text="Liguagens"
              disabled={!canEdit}
              {...register("language")}
            />
          </DivRawInput>

          <DivRawInput
            label="Aparência"
            description="Customize o tema de sua preferência"
            error={errors.appearance}
          >
            <PowerSelect
              list={["Light", "Dark"]}
              text="Tema"
              disabled={!canEdit}
              {...register("appearance")}
            />
          </DivRawInput>

          <DivRawInput
            label="Autenticação de dois fatores"
            description="Mantenha sua conta segura habilitando 2FA via e-mail ou usando uma senha temporária (TOTP)"
            error={errors.two_auth}
          >
            <Checkbox disabled={!canEdit} {...register("two_auth")} />
          </DivRawInput>
        </div>
      </div>

      <div className="py-5 sm:py-0 w-full fixed left-0 bottom-0 bg-primary-100 sm:static">
        <div className="container sm:w-full flex gap-4 justify-end">
          {!canEdit && (
            <button
              className="btn w-full sm:w-max sm:min-w-50 justify-center flex gap-2.5 items-center bg-primary-600 text-primary font-bold hover:bg-primary-500"
              onClick={() => setCanEdit(true)}
            >
              <FaPen size={14.5} color={theme.colors.primary} />
              Editar
            </button>
          )}

          {canEdit && (
            <DivButton
              linkCancel="/all-capters"
              textCancel="Cancelar"
              classDiv="sm:max-w-[25.5rem] w-full"
              classButtonCancel="border-primary-600 text-primary-600"
              textButton="Salvar"
            />
          )}
        </div>
      </div>
    </form>
  );
};
