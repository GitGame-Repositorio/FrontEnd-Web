import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdErrorOutline,
} from "react-icons/md";
import { useState } from "react";

import { Filter } from "../../../../common/Filter";
import { Modal, ModalProps } from "../../../../common/modal/Modal";
import { Search } from "../../../../common/Search";
import { objFilterWorks } from "../../service/data";
import { useResource } from "../../../../common/useResource";
import { User } from "../../../../@types/auth";
import { Loading } from "../../../Loading";
import { recordRemap } from "../../service/logicFilter";
import { PropsFilter } from "../../../../common/modal/modalCustom/ModalMultipleChoice";
import { DivCustomButton } from "../../../../common/Button/DivCustomButton";
import theme from "../../../../service/tailwindTheme";
import { api } from "../../../../api";

const MessageDenied = ({ msg }: { msg: string }) => (
  <div className="flex items-center gap-2">
    <MdErrorOutline color={theme.colors.primary[600]} size={20} />
    <p className="text-primary-600 font-medium text-sm">{msg}</p>
  </div>
);

const sendRequisition = async (listIds: string[]) => {
  await Promise.all(listIds.map((id) => api.post("/admin", { id_user: id })));
};

export const ModalAddAdmin = ({ ...rest }: ModalProps) => {
  const [filter, setFilter] = useState<PropsFilter[]>([objFilterWorks]);
  const players = useResource<User[]>("/player");
  const { callbackClose } = rest;

  const [listSelect, setListSelect] = useState<string[]>([]);
  const handleListSelect = (id: string) => {
    listSelect.includes(id)
      ? setListSelect(listSelect.filter((idFilter) => idFilter !== id))
      : setListSelect([...listSelect, id]);
  };

  if (!players) return <Loading />;

  const listPlayers: User[] = recordRemap(
    players.filter((obj) => !obj.isAdmin),
    filter
  );

  const listElements = listPlayers.map((objPlayer) => {
    const Icon = listSelect.includes(objPlayer.id)
      ? MdCheckBox
      : MdCheckBoxOutlineBlank;
    return (
      <li
        className="w-full cursor-pointer rounded-lg bg-primary-200 hover:bg-primary-300 p-3 flex justify-between items-center"
        onClick={() => handleListSelect(objPlayer.id)}
      >
        <p className="text-sm font-medium">{objPlayer.email}</p>
        <Icon size={32} color={theme.colors.primary[600]} />
      </li>
    );
  });

  return (
    <Modal {...rest} title="Adicionar administrador" className="space-y-1">
      <Search className="font-medium border border-solid border-primary-600">
        <Filter list={filter} callbackUpdate={setFilter} />
      </Search>
      <div className="space-y-1">
        <p className="font-medium text-sm">Usuários</p>
        {!listPlayers.length ? (
          <MessageDenied msg="Usuário não encontrado" />
        ) : (
          <ul className="appearance-none space-y-2">{listElements}</ul>
        )}
      </div>
      <DivCustomButton
        callbackClose={callbackClose}
        callbackSuccess={() => sendRequisition(listSelect)}
        textMain="OK"
      />
    </Modal>
  );
};
