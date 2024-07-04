import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";

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

type Props = {
  user: User;
  submit: (user: User) => void;
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

  const classInput =
    "bg-primary-200 text-primary-600 border border-solid border-primary-600 focus:outline-primary-400";

  return (
    <form
      className="min-h-screen container flex flex-col justify-between gap-12 pb-20"
      onSubmit={handleSubmit(submit)}
    >
      <div>
        <div className="pt-8 mb-6 space-y-5">
          <h2 className="text-xl font-bold">Foto de Perfil</h2>
          <div className="flex gap-8 items-center">
            <img
              src={imgUrl}
              alt="Perfil"
              className="h-15 w-15 rounded-full cursor-pointer hover:opacity-40"
            />

            <div className="font-medium leading-tight flex gap-4">
              <button className="btn w-32 uppercase border border-solid border-primary-600 text-primary-600">
                Remover
              </button>
              <button className="btn w-32 uppercase bg-primary-600 text-primary">
                Upload
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <DivInput label="Nome" error={errors.name}>
            <InputText
              className={classInput}
              placeholder="Digite seu nome..."
              {...register("name")}
            />
          </DivInput>

          <DivInput label="Email" error={errors.email}>
            <InputText
              className={classInput}
              placeholder="Digite seu email..."
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
              {...register("work")}
            />
          </DivRawInput>

          <DivRawInput
            label="Linguagem"
            description="Customize qual linguagem você quer ver"
            error={errors.language}
          >
            <PowerSelect
              list={["Português", "Inglês"]}
              text="Liguagens"
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
              {...register("appearance")}
            />
          </DivRawInput>

          <DivRawInput
            label="Autenticação de dois fatores"
            description="Mantenha sua conta segura habilitando 2FA via e-mail ou usando uma senha temporária (TOTP)"
            error={errors.two_auth}
          >
            <Checkbox {...register("two_auth")} />
          </DivRawInput>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-between">
        <button className="btn md:min-w-50 justify-center flex gap-2.5 items-center bg-primary-800 text-primary">
          <MdEdit size={17.5} color={theme.colors.primary} />
          {/* <p className="hidden md:inline">Editar</p> */}
          Editar
        </button>

        <DivButton
          linkCancel="/all-capters"
          textCancel="Cancelar"
          classDiv="max-w-[25.5rem] w-full"
          classButtonCancel="border-primary-600 text-primary-600"
          textButton="Salvar"
        />
      </div>
    </form>
  );
};
