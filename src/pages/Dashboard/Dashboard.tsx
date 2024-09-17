import {
  MdBarChart,
  MdWarningAmber,
  MdFormatListNumbered,
  MdAdminPanelSettings,
} from "react-icons/md";

import { Card } from "../../common/Card";
import { HeaderGame } from "../../common/Header/HeaderGame";

import { ReactElement, useState } from "react";
import { ReportsContent } from "./components/content/ReportsContent";
import { PlayerContent } from "./components/content/PlayerContent";
import { AdminContent } from "./components/content/AdminContent";
import { StatisticsContent } from "./components/content/StatisticsContent";

type SectionKeys = "statistic" | "admins" | "players" | "reports";

const sectionDashboard: Record<SectionKeys, ReactElement> = {
  statistic: <StatisticsContent />,
  reports: <ReportsContent />,
  players: <PlayerContent />,
  admins: <AdminContent />,
};

export const Dashboard = () => {
  const section = localStorage.getItem("sectionDashboard") as SectionKeys;
  const [content, setContent] = useState(
    sectionDashboard[section] || sectionDashboard.reports
  );

  const updateSection = (name: SectionKeys) => {
    localStorage.setItem("sectionDashboard", name);
    const newSection = sectionDashboard[name];
    setContent(newSection);
  };

  return (
    <main className="pb-8">
      <HeaderGame namePage="Dashboard" />
      <div className="container space-y-6">
        <div className="flex gap-6 mt-8 overflow-hidden min-h-36">
          <Card
            icon={MdWarningAmber}
            onClick={() => updateSection("reports")}
            title="Problemas relatados"
            value="245"
          />

          <Card
            icon={MdFormatListNumbered}
            onClick={() => updateSection("players")}
            title="Quantidade de jogadores totais"
            value="1.035"
          />

          <Card
            icon={MdAdminPanelSettings}
            onClick={() => updateSection("admins")}
            title="Administradores"
            value="1.035"
          />

          <Card
            icon={MdBarChart}
            onClick={() => updateSection("statistic")}
            title="Estatísticas de exercícios"
            value="1.035"
          />
        </div>
        <div className="bg-primary-200 py-12 px-8 rounded-xl space-y-8">
          {content}
        </div>
      </div>
    </main>
  );
};
