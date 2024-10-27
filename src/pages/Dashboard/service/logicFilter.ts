import { PropsFilter } from "../../../common/modal/modalCustom/ModalMultipleChoice";
import { ListKey, Record } from "../type/dashboard";

const filterMap = (record: Record, filterList: PropsFilter[]) => {
  const list: PropsFilter[] = filterList.filter((obj: PropsFilter) =>
    obj.type === "section" && !obj.func
      ? filterMap(record, obj.listValue)
      : obj.func(record)
  );
  return list.length === filterList.length;
};

const searchCalc = (obj: Record, orderProps: ListKey, textSearch: string) => {
  return orderProps
    ?.map((props, index) => {
      const indexRes = obj[props]
        ?.toLowerCase()
        ?.indexOf(textSearch.toLowerCase());
      return indexRes > 0 ? (indexRes + 1) / index : indexRes + index;
    })
    .reduce((num, accumulator) => num + accumulator, 0);
};

export const recordRemap = (
  listRecord: Record[],
  filterList: PropsFilter[],
  textSearch: string,
  orderProps: ListKey
) => {
  return listRecord
    .filter((record) => filterMap(record, filterList))
    .sort((objA, objB) => {
      const resA = searchCalc(objA, orderProps, textSearch);
      const resB = searchCalc(objB, orderProps, textSearch);
      return resB - resA;
    });
};
