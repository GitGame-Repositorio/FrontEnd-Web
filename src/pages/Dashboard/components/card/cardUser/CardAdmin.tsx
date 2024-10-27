import { useState } from "react";
import { CardUser } from "./CardUser";
import { api } from "../../../../../api";
import { User } from "../../../../../@types/auth";
import { ModalAdminEdit } from "../../modal/ModalAdmin";
import { useModal } from "../../../../../common/modal/useModal";
import { ModalUserEditProps } from "../../modal/ModalUser";
import { useAuth } from "../../../../../AuthContext";

export const CardAdmin = (user: User) => {
  const edit = async (record: User) => {
    await api.patch(`/admin/${user.id}`, record);
  };

  const { user: userCurrent } = useAuth();
  const { canEditPrivilegiesAdmin, canViewAllAdmin } = userCurrent.admin;

  const [canEdit, setCanEdit] = useState(false);

  const {
    Modal: ModalUser,
    openModal: openModalEdit,
    closeModal: closeModalEdit,
  } = useModal<ModalUserEditProps>({
    modal: ModalAdminEdit,
  });

  const openModal = (mode: "view" | "edit") => {
    const isModeEdit = mode === "edit";
    openModalEdit();
    setCanEdit(isModeEdit);
  };

  return (
    <>
      <CardUser
        canEditUser={canEditPrivilegiesAdmin}
        canViewUser={canViewAllAdmin}
        openModal={openModal}
        user={user}
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
