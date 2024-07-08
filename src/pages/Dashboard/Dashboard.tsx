import {
  MdBarChart,
  MdWarningAmber,
  MdOutlinePeopleAlt,
  MdFormatListNumbered,
  MdAdminPanelSettings,
} from "react-icons/md";

import { Card } from "../../common/Card";
import { Search } from "../../common/Search";
import { HeaderGame } from "../../common/HeaderGame";
import { Report } from "../../@types/game";

import listReport from "./data.json";
import { CardReport } from "./components/CardReport";

export const Dashboard = () => {
  return (
    <main className="pb-8">
      <HeaderGame namePage="Dashboard" />
      <div className="container space-y-6">
        <div className="flex gap-6 mt-8 overflow-hidden min-h-36">
          <Card
            icon={MdWarningAmber}
            onClick={() => {}}
            title="Problemas relatados"
            value="245"
          />

          <Card
            icon={MdOutlinePeopleAlt}
            onClick={() => {}}
            title="Quantidade de jogadores totais"
            value="1.035"
          />

          <Card
            icon={MdFormatListNumbered}
            onClick={() => {}}
            title="Quantidade de jogadores logados"
            value="1.035"
          />

          <Card
            icon={MdAdminPanelSettings}
            onClick={() => {}}
            title="Administradores"
            value="1.035"
          />

          <Card
            icon={MdBarChart}
            onClick={() => {}}
            title="Estatísticas de exercícios"
            value="1.035"
          />
        </div>
        <div className="bg-primary-200 py-12 px-8 rounded-xl space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-primary-800">
              Problemas relatados
            </h2>
            <Search />
          </div>
          <div className="flex flex-col gap-3">
            {listReport.map((report: Report) => {
              return <CardReport key={report.id} {...report} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
};
