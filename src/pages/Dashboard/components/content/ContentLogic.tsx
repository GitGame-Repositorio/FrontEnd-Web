import { ReactElement, useEffect, useState } from "react";

import { PropsFilter } from "../../../../common/modal/modalCustom/ModalMultipleChoice";
import { Filter } from "../../../../common/Filter";
import { Search } from "../../../../common/Search";
import { Record } from "../../type/dashboard";
import { recordRemap } from "../../service/logicFilter";

export const ContentLogic = ({
  name,
  filter,
  record,
  createList,
  updateFilter,
}: {
  name: string;
  record: Record[];
  filter: PropsFilter[];
  createList: (list: Record[]) => ReactElement;
  updateFilter: (filter: PropsFilter[]) => void;
}) => {
  const [list, setList] = useState<Record[]>([]);

  useEffect(() => {
    setList(recordRemap(record, filter));
  }, [filter, record]);

  return (
    <>
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-primary-800">{name}</h2>
        <div>
          <Search>
            <Filter
              list={filter}
              callbackUpdate={(listFilter) => {
                setList(recordRemap(record, filter));
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
