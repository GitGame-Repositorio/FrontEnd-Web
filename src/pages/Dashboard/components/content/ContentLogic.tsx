import { useEffect, useState } from "react";

import { CardReport } from "../CardReport";
import { Filter } from "../../../../common/Filter";
import { Search } from "../../../../common/Search";
import { PropsFilter } from "../../../../common/modal/modalCustom/ModalMultipleChoice";

type Record = Report;

const filterMap = (record: Record, filterList: PropsFilter[]) => {
  const list: PropsFilter[] = filterList.filter((obj: PropsFilter) =>
    obj.type === "section" && !obj.func
      ? filterMap(record, obj.listValue)
      : obj.func(record)
  );
  return list.length === filterList.length;
};

const recordRemap = (listRecord: Record[], filterList: PropsFilter[]) => {
  return listRecord.filter((record) => filterMap(record, filterList));
};

export const ContentLogic = ({
  name,
  record,
  filter,
  updateFilter,
}: {
  name: string;
  record: Report[];
  filter: PropsFilter[];
  updateFilter: (filter: PropsFilter[]) => void;
}) => {
  const [list, setList] = useState<Report[]>([]);

  // console.log(filter);

  useEffect(() => {
    setList(recordRemap(record, filter));
  }, [filter]);

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
      <div className="flex flex-col gap-3">
        {list?.map((report: Report) => {
          return <CardReport key={report.id} {...report} />;
        })}
      </div>
    </>
  );
};
