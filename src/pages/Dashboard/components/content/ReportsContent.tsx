import { Report } from "../../../../@types/game";
import { Search } from "../../../../common/Search";
import { CardReport } from "../CardReport";
import { useResource } from "../../../../common/useResource";

export const ReportsContent = () => {
  const reports = useResource<Report[]>("/reports");
  return (
    <>
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-primary-800">
          Problemas relatados
        </h2>
        <Search />
      </div>
      <div className="flex flex-col gap-3">
        {reports?.map((report: Report) => {
          return <CardReport key={report.id} {...report} />;
        })}
      </div>
    </>
  );
};
