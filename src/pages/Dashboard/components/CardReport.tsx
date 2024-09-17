import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

import theme from "../../../service/tailwindTheme";
import { vocabulary } from "../../../translator";
import { Report } from "../../../@types/game";
import { useModal } from "../../../common/modal/useModal";
import { api } from "../../../api";
import { useState } from "react";
import {
  ModalChoice,
  ModalChoiceProps,
} from "../../../common/modal/modalCustom/ModalChoice";
import {
  ModalUniqueChoice,
  ModalUniqueChoiceProps,
} from "../../../common/modal/modalCustom/ModalUniqueChoice";

const bgColors = {
  OPENED: "bg-primary-600",
  RESOLVED: "bg-primary-700",
  REMOVED: "bg-primary-950",
  CLOSED: "bg-primary-200 text-primary-600",
};

const listStatus = [
  { name: "Aberto", value: "OPENED" },
  { name: "Fechado", value: "CLOSED" },
  { name: "Resolvido", value: "RESOLVED" },
];

export const CardReport = (record: Report) => {
  const [report, setReport] = useState(record);
  const { id, title, description, status } = report;

  const { Modal: ModalEdit, openModal: openModalEdit } =
    useModal<ModalUniqueChoiceProps>({
      modal: ModalUniqueChoice,
    });

  const { Modal: ModalTrash, openModal: openModalTrash } =
    useModal<ModalChoiceProps>({
      modal: ModalChoice,
    });

  const editStatus = async (statusList: string[]) => {
    const [status] = statusList;
    const newReport = await api.patch(`/reports/${id}`, { status });
    setReport({ ...report, status });
    return newReport;
  };

  return (
    <>
      <div className="bg-primary-800 py-4 px-3 rounded-xl w-full space-y-2.5 text-base text-primary font-bold">
        <div className="flex justify-between items-center">
          <p>{title}</p>
          <div className="flex gap-2">
            <span className={`px-3 py-2.5 rounded-xl ${bgColors[status]}`}>
              {vocabulary[status]}
            </span>
            <button className="bg-primary-600 rounded-xl content-center min-w-11 min-h-10">
              <MdDeleteOutline
                size={22}
                onClick={openModalTrash}
                color={theme.colors.primary[50]}
              />
            </button>
            <button className="bg-primary-600 rounded-xl content-center min-w-11 min-h-10">
              <MdOutlineEdit
                size={22}
                onClick={openModalEdit}
                color={theme.colors.primary[50]}
              />
            </button>
          </div>
        </div>
        <p>{description}</p>
      </div>
      <ModalEdit
        listValues={listStatus}
        listValuesSelect={[status]}
        updateSelect={editStatus}
        title="Editar Status"
      />
      <ModalTrash
        title="Mover para lixeira"
        text="Deseja mesmo mover esse report para lixeira?"
        callbackSuccess={() => editStatus(["REMOVED"])}
      />
    </>
  );
};
