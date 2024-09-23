import { useState } from "react";
import { User } from "../../../../@types/auth";
import {
  ModalMultipleChoice,
  PropsFilter,
} from "../../../../common/modal/modalCustom/ModalMultipleChoice";
import { listValuePermission } from "../../service/data";
import { ContentUser, ModalUserEdit, ModalUserEditProps } from "./ModalUser";
import { useModal } from "../../../../common/modal/useModal";
import { useAuth } from "../../../../AuthContext";

const updatePermissionsInObj = (list: object[], user: User) => {
  return list.map((current) => {
    const privilegies = current.listValue.map(({ value, ...restObj }) => {
      const objValue = Object.fromEntries([
        ["select", user.admin[value]],
        ["value", value],
      ]);
      return { ...restObj, ...objValue };
    });
    return { ...current, listValue: privilegies };
  });
};

export const ModalAdminEdit = ({
  callbackSuccess,
  ...rest
}: ModalUserEditProps) => {
  const { user, canEdit } = rest;
  const [listPermission, setListPermission] = useState(
    updatePermissionsInObj(listValuePermission, user)
  );

  const privilegies = listPermission.reduce((accumulator, current) => {
    const newList = current.listValue.map(({ value, select }) => [
      value,
      select,
    ]);
    return Object.fromEntries(newList);
  }, {});

  const { Modal: ModalPermission, openModal } = useModal({
    modal: ModalMultipleChoice,
  });

  const { user: userCurrent } = useAuth();
  const { canDeleteAdmin } = userCurrent.admin;

  return (
    <ModalUserEdit
      callbackSuccess={(fields: User) => {
        callbackSuccess({ ...fields, privilegies });
      }}
      canDeleteUser={canDeleteAdmin}
      {...rest}
    >
      <>
        {canEdit && (
          <ContentUser title="Permissões">
            <>
              <button
                className="btn rounded-lg w-2/6 text-base bg-primary-600 hover:bg-primary-700 text-primary-100 uppercase"
                onClick={openModal}
              >
                Editar Permissões
              </button>
              <ModalPermission
                updateSelect={setListPermission}
                listValues={listPermission}
                title="Permissões"
              />
            </>
          </ContentUser>
        )}
      </>
    </ModalUserEdit>
  );
};
