import { useResource } from "../../../../common/useResource";
import { User } from "../../../../@types/auth";
import { Loading } from "../../../Loading";
import { ContentLogic } from "./ContentLogic";
import { ListCard } from "../card/ListCard";
import { useState } from "react";
import { classNameGrid } from "../../service/style";
import { objFilterWorks } from "../../service/data";
import { CardAdmin } from "../card/cardUser/CardAdmin";
import { MdAdd } from "react-icons/md";
import { useModal } from "../../../../common/modal/useModal";
import { ModalAddAdmin } from "../modal/ModalAddAdmin";
import { useAuth } from "../../../../AuthContext";
import { MainContent } from "../MainContent";

export const AdminContent = () => {
  const { reloadPage } = useAuth();

  const admins = useResource<User[]>("/admin", [reloadPage.register]);

  const [filter, setFilter] = useState([objFilterWorks]);

  const { Modal: ModalAdd, openModal } = useModal({
    modal: ModalAddAdmin,
  });

  if (!admins) return <Loading />;

  return (
    <MainContent>
      <ContentLogic
        filter={filter}
        record={admins}
        updateFilter={setFilter}
        createList={(list: User[]) => (
          <ListCard card={CardAdmin} list={list} className={classNameGrid} />
        )}
        name="Todos Administradores"
        orderProps={["name", "email"]}
      />
      <div className="flex justify-end">
        <button
          className="uppercase btn bg-primary-600 text-primary font-medium text-base flex items-center gap-2.5"
          onClick={openModal}
        >
          <MdAdd size={20} />
          Adicionar
        </button>
      </div>
      <ModalAdd />
    </MainContent>
  );
};
