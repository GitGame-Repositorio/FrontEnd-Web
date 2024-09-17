import { PropsFilter } from "../../common/modal/modalCustom/ModalMultipleChoice";

export const listLanguage = [
  { name: "Português", value: "portuguese" },
  { name: "Inglês", value: "english" },
];

export const listAppearance = [
  { name: "Light", value: "LIGHT" },
  { name: "Dark", value: "DARK" },
];

export const works = [
  { name: "Professor", value: "teacher" },
  { name: "Estudante", value: "student" },
  { name: "Desenvolvedor", value: "development" },
  { name: "QA", value: "qa" },
];

export const createListSelectWorks = (worksUser: string[]): PropsFilter[] => [
  {
    type: "section",
    handleSelect: function (newObj: PropsFilter, list: PropsFilter[]) {
      const listRemap = list.map((obj) =>
        obj.value === newObj.value ? newObj : { ...obj, notInteract: false }
      );
      const isSizeAccepted = listRemap.filter((obj) => obj.select).length < 3;
      if (!isSizeAccepted)
        return listRemap.map((obj) =>
          obj.select ? obj : { ...obj, notInteract: true }
        );
      return listRemap;
    },
    listValue: works.map((obj) => ({
      ...obj,
      select: worksUser.includes(obj.value),
    })),
  },
];
