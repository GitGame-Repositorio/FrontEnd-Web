import { ReactElement, useEffect, useState } from "react";

import { PropsFilter } from "../../../../common/modal/modalCustom/ModalMultipleChoice";
import { Filter } from "../../../../common/Filter";
import { Search } from "../../../../common/Search";
import { ListKey, Record } from "../../type/dashboard";
import { recordRemap } from "../../service/logicFilter";

type Props = {
  name: string;
  record: Record[];
  orderProps: ListKey;
  filter: PropsFilter[];
  createList: (list: Record[]) => ReactElement;
  updateFilter: (filter: PropsFilter[]) => void;
};

export const ContentLogic = ({
  name,
  filter,
  record,
  orderProps,
  createList,
  updateFilter,
}: Props) => {
  const [list, setList] = useState<Record[]>([]);
  const [search, setSearch] = useState("");

  const updateList = () =>
    setList(recordRemap(record, filter, search, orderProps));

  useEffect(() => {
    updateList();
  }, [filter, record, search]);

  return (
    <>
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-primary-800">{name}</h2>
        <div>
          <Search text={search} setText={setSearch}>
            <Filter
              list={filter}
              callbackUpdate={(listFilter) => {
                updateList();
                return updateFilter(listFilter);
              }}
            />
          </Search>
        </div>
      </div>
      {createList(list)}
    </>
  );
};
