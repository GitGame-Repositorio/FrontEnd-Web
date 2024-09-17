import { useState } from "react";

import { Loading } from "../../../Loading";
import { Report } from "../../../../@types/game.d";
import { useResource } from "../../../../common/useResource";
import { PropsFilter as PropsFilter } from "../../../../common/modal/modalCustom/ModalMultipleChoice";
import { ContentLogic } from "./ContentLogic";

export const ReportsContent = () => {
  const reports = useResource<Report[]>("/reports");

  const [filter, setFilter] = useState([
    {
      name: "Status",
      type: "section",
      func: function (record: Report) {
        return this.listValue.some(
          (obj) => record.status === obj.value && obj.select
        );
      },
      handleSelect: (newObj: PropsFilter, list: PropsFilter[]) => {
        if (newObj.value === "REMOVED" && newObj.select) {
          return list.map((obj) =>
            obj.value === "REMOVED" ? newObj : { ...obj, select: false }
          );
        }
        return list.map((obj) => {
          switch (obj.value) {
            case "REMOVED":
              return { ...obj, select: false };
            case newObj.value:
              return newObj;
            default:
              return obj;
          }
        });
      },
      listValue: [
        { name: "Resolvido", select: true, value: "RESOLVED" },
        { name: "Aberto", select: true, value: "OPENED" },
        { name: "Fechado", select: true, value: "CLOSED" },
        { name: "Na lixeira", select: false, value: "REMOVED" },
      ],
    },
    {
      name: "Usuário",
      type: "section",
      func: function (record: Report) {
        return this.listValue.some(
          (obj) =>
            ((obj.value === "LOGGED" && record.user.userLogged) ||
              (obj.value === "ANONYMOUS" && !record.user.userLogged)) &&
            obj.select
        );
      },
      listValue: [
        { name: "Logados", select: true, value: "LOGGED" },
        { name: "Anônimos", select: true, value: "ANONYMOUS" },
      ],
    },
  ]);

  if (!reports) return <Loading />;

  return (
    <ContentLogic
      filter={filter}
      record={reports}
      updateFilter={setFilter}
      name="Problemas relatados"
    />
  );
};
