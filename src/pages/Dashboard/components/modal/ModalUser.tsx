import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReactElement } from "react";
import { IoMdTrash } from "react-icons/io";

import { User } from "../../../../@types/auth";
import { Modal } from "../../../../common/modal/Modal";
import { Label } from "../../../../common/Label";
import { InputText } from "../../../../common/Input/inputCustom/InputText";
import { userSchema, UserSchemeType } from "../../../User/userSchema";
import { InputTextLine } from "../InputTextLine";
import { PowerSelect } from "../../../../common/Input/inputCustom/PowerSelect";
import { listAppearance, listLanguage } from "../../../User/service";
import { useRefresh } from "../../../../common/useRefresh";
import { ChoseElement } from "../ChoseElement";
import { DivButton } from "../../../../common/Button/DivButton";
import { ButtonOutline } from "../../../../common/Button/ButtonCustomn/ButtonOutline";
import { Button } from "../../../../common/Button/ButtonCustomn/Button";
import theme from "../../../../service/tailwindTheme";
import { useModal } from "../../../../common/modal/useModal";
import { ModalChoice } from "../../../../common/modal/modalCustom/ModalChoice";
import { useAuth } from "../../../../AuthContext";
import { api } from "../../../../api";

export type ModalChoiceProps = {
  text: string;
  title: string;
  children?: ReactElement;
  callbackSuccess?: () => void;
};

export type ModalUserEditProps = {
  callbackSuccess: (fields: User) => User;
  callbackClose: () => void;
  canDeleteUser: boolean;
  children: ReactElement;
  canEdit: boolean;
  user: User;
};

type ContentUserProps = {
  title: string;
  children: ReactElement;
};

export const ContentUser = ({ title, children }: ContentUserProps) => {
  return (
    <div className="flex flex-col font-bold gap-1 cursor-auto">
      <p>{title}</p>
      {children}
    </div>
  );
};

const deleteUser = async (id: string) => {
  await api.delete(`/player/${id}`);
};

export const ModalUserEdit = ({
  callbackSuccess,
  canDeleteUser,
  callbackClose,
  children,
  canEdit,
  user,
  ...rest
}: ModalUserEditProps) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemeType>({
    defaultValues: user,
    disabled: !canEdit,
    resolver: zodResolver(userSchema),
  });

  const refresh = useRefresh();
  const { Modal: ModalDelete, openModal: openModalDelete } =
    useModal<ModalChoiceProps>({
      modal: ModalChoice,
    });

  const lineElement = <hr className="h-px w-full bg-primary-200" />;

  const { reloadUser, reloadPage } = useAuth();

  return (
    <Modal callbackClose={callbackClose} {...rest} className="max-w-screen-sm">
      <form
        onSubmit={handleSubmit((fields: User) => {
          callbackSuccess(fields);
          callbackClose();
          reloadUser();
          reloadPage.refresh();
        })}
        className="space-y-4"
      >
        <div className="space-y-3">
          <InputText
            className="outline-0 text-base h-6 placeholder:text-primary-800 placeholder:font-medium p-0"
            placeholder="Sem Nome"
            {...register("name")}
          />

          <hr className="line-custom" />

          <div className="flex flex-col gap-2">
            <ContentUser title="E-mail">
              <InputTextLine type="email" {...register("email")} />
            </ContentUser>

            {lineElement}

            <ContentUser title="Profissão">
              <div className="flex gap-2 peer-checked:hidden">
                {user.works.map((item) => (
                  <Label
                    value={item}
                    className="px-2 py-0 font-medium text-sm border-0 rounded-md"
                  />
                ))}
              </div>
            </ContentUser>

            {lineElement}

            <ContentUser title="Linguagem">
              <ChoseElement
                disabled={!canEdit}
                value={getValues("language")}
                id="language"
              >
                <PowerSelect
                  classNameDiv="hidden peer-checked:flex"
                  className="h-8 text-sm"
                  {...register("language")}
                  list={listLanguage}
                  onBlur={refresh}
                />
              </ChoseElement>
            </ContentUser>

            {lineElement}

            <ContentUser title="Tema">
              <ChoseElement
                disabled={!canEdit}
                value={getValues("appearance")}
                id="appearance"
              >
                <PowerSelect
                  classNameDiv="hidden peer-checked:flex"
                  className="h-8 text-sm"
                  {...register("appearance")}
                  list={listAppearance}
                  onBlur={refresh}
                />
              </ChoseElement>
            </ContentUser>

            {lineElement}

            <ContentUser title="Registro">
              <p>20/05/2024</p>
            </ContentUser>

            {lineElement}

            {children}
          </div>
        </div>

        {canEdit && (
          <DivButton>
            <>
              <button
                className="btn bg-primary-600 hover:bg-primary-700 disabled:bg-gray-500"
                disabled={!canDeleteUser}
                onClick={openModalDelete}
              >
                <IoMdTrash color={theme.colors.primary[50]} size={20} />
              </button>
              <div className="flex w-full gap-4">
                <ButtonOutline
                  className="border-primary-500 text-primary-500 hover:bg-primary-500"
                  onClick={callbackClose}
                />
                <Button />
              </div>
            </>
          </DivButton>
        )}
      </form>
      <ModalDelete
        callbackSuccess={() => {
          deleteUser(user.id);
          reloadPage.refresh();
        }}
        callbackClose={callbackClose}
        text="Deseja mesmo excluir esse usuário?"
        title="Exclusão de Usuário"
      />
    </Modal>
  );
};
