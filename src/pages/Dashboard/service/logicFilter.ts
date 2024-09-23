import { PropsFilter } from "../../../common/modal/modalCustom/ModalMultipleChoice";
import { Record } from "../type/dashboard";

const filterMap = (record: Record, filterList: PropsFilter[]) => {
  const list: PropsFilter[] = filterList.filter((obj: PropsFilter) =>
    obj.type === "section" && !obj.func
      ? filterMap(record, obj.listValue)
      : obj.func(record)
  );
  return list.length === filterList.length;
};

export const recordRemap = (
  listRecord: Record[],
  filterList: PropsFilter[]
) => {
  return listRecord.filter((record) => filterMap(record, filterList));
};
