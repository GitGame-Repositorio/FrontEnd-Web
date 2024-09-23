import { User } from "../../../@types/auth";

export const listValuePermission = [
  {
    name: "Permissões",
    type: "section",
    func: function (record: User) {
      return this.listValue.some(
        (obj) => record?.admin[obj.value] && obj.select
      );
    },
    listValue: [
      {
        name: "Gerenciar Player",
        select: true,
        value: "canManageCRUDPlayer",
      },
      {
        name: "Gerenciar Reports",
        select: true,
        value: "canManageCRUDReports",
      },
      {
        name: "Gerenciar Conteúdo",
        select: true,
        value: "canManageContentGame",
      },
      {
        name: "Reordenar Conteúdo",
        select: true,
        value: "canReorderContentGame",
      },
    ],
  },
];

export const objFilterWorks = {
  name: "Profissões",
  type: "section",
  func: function (record: User) {
    return this.listValue.some((obj) => {
      if (!record.works.length && obj.value === "empty" && obj.select)
        return true;
      return record.works.includes(obj.value) && obj.select;
    });
  },
  listValue: [
    { name: "Professor", select: true, value: "teacher" },
    { name: "Estudante", select: true, value: "student" },
    { name: "Desenvolvedor", select: true, value: "development" },
    { name: "QA", select: true, value: "qa" },
    { name: "Sem cargos", select: true, value: "empty" },
  ],
};
