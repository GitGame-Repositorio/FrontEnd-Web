import { useState } from "react";
import { User } from "../../../../../@types/auth";
import { api } from "../../../../../api";
import { ModalProps } from "../../../../../common/modal/Modal";
import { useModal } from "../../../../../common/modal/useModal";
import { CardUser } from "./CardUser";
import { ModalPlayerEdit } from "../../modal/ModalPlayer";
import { useAuth } from "../../../../../AuthContext";
import { ModalUserEditProps } from "../../modal/ModalUser";

export const CardPlayer = (user: User) => {
  const edit = async (record: User) => {
    await api.patch(`/player/${user.id}`, record);
  };

  const { user: userCurrent } = useAuth();
  const { canManageCRUDPlayer } = userCurrent.admin;

  const [canEdit, setCanEdit] = useState(false);

  const {
    Modal: ModalUser,
    openModal: openModalEdit,
    closeModal: closeModalEdit,
  } = useModal<ModalUserEditProps>({
    modal: ModalPlayerEdit,
  });

  const openModal = (mode: "view" | "edit") => {
    const isModeEdit = mode === "edit";
    openModalEdit();
    setCanEdit(isModeEdit);
  };

  return (
    <>
      <CardUser
        user={user}
        canEditUser={canManageCRUDPlayer}
        canViewUser={canManageCRUDPlayer}
        openModal={openModal}
      />
      <ModalUser
        user={user}
        canEdit={canEdit}
        callbackSuccess={edit}
        callbackClose={() => closeModalEdit()}
      />
    </>
  );
};
