import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaPen } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useRef, useState } from "react";

import { User } from "../../@types/auth.d";
import { DivInput } from "../../common/Input/DivInput";
import { InputText } from "../../common/Input/inputCustom/InputText";
import { DivRawInput } from "../../common/Input/DivRawInput";
import { PowerSelect } from "../../common/Input/inputCustom/PowerSelect";
import { Checkbox } from "../../common/Input/inputCustom/Checkbox";
import { DivButton } from "../auth/components/DivButton";
import { UserSchemeType, userSchema } from "./userSchema";

import theme from "../../service/tailwindTheme";
import { ModalMultipleChoice } from "../../common/modal/modalCustom/ModalMultipleChoice";
import { useModal } from "../../common/modal/useModal";
import { listAppearance, listLanguage, works } from "./service";
import { ListLabels } from "../../common/ListLabels";
import { Label } from "../../common/Label";
import { useAuth } from "../../AuthContext";

type Props = {
  user: User;
  submit: (values: any) => void;
};

const convert2base64 = async (
  file: File,
  updateImg: (value: string) => void
) => {
  const reader = new FileReader();
  reader.onload = () => {
    updateImg(reader.result?.toString());
  };
  reader.readAsDataURL(file);
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

  const objFile = useRef<File>();

  const { imgPerfil } = useAuth();
  const [imageSrc, setImageSrc] = useState(imgPerfil);

  const [canEdit, setCanEdit] = useState(false);
  const { Modal: ModalWorks, openModal } = useModal({
    modal: ModalMultipleChoice,
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const listFiles = event.target.files as FileList;
    const fileSelect = listFiles[0];
    objFile.current = fileSelect;
    await convert2base64(fileSelect, setImageSrc);
  };

  const classInput =
    "bg-primary-200 border border-solid border-primary-600 focus:outline-primary-400";

  const [selectWork, setSelectWork] = useState<string[]>(user.works);

  return (
    <form
      className="min-h-screen container flex flex-col justify-between gap-12 pb-24 sm:pb-12"
      onSubmit={handleSubmit((values) =>
        submit({
          ...values,
          works: selectWork,
          picture: objFile.current,
          two_auth: undefined,
        })
      )}
      noValidate
    >
      <div className="pt-8 space-y-6">
        <div className="space-y-5">
          <h2 className="text-xl font-bold">Foto de Perfil</h2>
          <div className="flex gap-3 sm:gap-8 items-center">
            <img
              src={imageSrc}
              alt="Perfil"
              className="h-15 w-15 rounded-full"
            />

            {canEdit && (
              <div className="font-medium leading-tight flex gap-2 sm:gap-4">
                <button
                  className="btn uppercase border border-solid border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-primary-100"
                  onClick={() => {
                    setImageSrc(imgPerfil);
                    objFile.current = undefined;
                  }}
                >
                  Remover
                </button>
                <label className="btn justify-center w-32 uppercase bg-primary-600 text-primary hover:bg-primary-700">
                  Upload
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
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
          >
            <div className="flex flex-wrap gap-3 justify-end">
              {!canEdit && !selectWork.length && (
                <Label
                  value="Sem nenhuma profissão"
                  className="py-3 opacity-80"
                />
              )}
              {Boolean(selectWork.length) && (
                <ListLabels
                  list={works.filter(({ value }) => selectWork.includes(value))}
                />
              )}
              {canEdit && (
                <button
                  onClick={openModal}
                  disabled={!canEdit}
                  className="btn gap-2 font-medium bg-primary-600 text-primary hover:bg-primary-500"
                >
                  Adicionar
                  <MdAdd />
                </button>
              )}
            </div>
          </DivRawInput>

          <DivRawInput
            label="Linguagem"
            description="Customize qual linguagem você quer ver"
            error={errors.language}
          >
            <PowerSelect
              list={listLanguage}
              text="Liguagens"
              disabled={!canEdit}
              className="disabled:opacity-100"
              {...register("language")}
            />
          </DivRawInput>

          <DivRawInput
            label="Aparência"
            description="Customize o tema de sua preferência"
            error={errors.appearance}
          >
            <PowerSelect
              list={listAppearance}
              text="Tema"
              disabled={!canEdit}
              className="disabled:opacity-100"
              {...register("appearance")}
            />
          </DivRawInput>

          <DivRawInput
            label="Autenticação de dois fatores"
            description="Mantenha sua conta segura habilitando 2FA via e-mail ou usando uma senha temporária (TOTP)"
            error={errors.two_auth}
          >
            <Checkbox
              disabled={!canEdit}
              {...register("two_auth")}
              className="disabled:opacity-100"
            />
          </DivRawInput>
        </div>
      </div>

      <ModalWorks
        title="Selecionar áreas"
        listValuesSelect={selectWork}
        updateSelect={setSelectWork}
        listValues={works}
        limitSelect={3}
      />

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
