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
import { useAuth } from "../../AuthContext";
import { CardDashboard } from "./components/card/CardDashboard";

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

  const { user } = useAuth();

  const { canManageCRUDReports, canManageCRUDPlayer, canViewAllAdmin } =
    user?.admin || {};

  const updateSection = (name: SectionKeys) => {
    localStorage.setItem("sectionDashboard", name);
    const newSection = sectionDashboard[name];
    setContent(newSection);
  };

  const choseType = (text: SectionKeys, access: boolean | undefined) =>
    section === text ? "actual" : access ? "access" : "block";

  return (
    <main className="pb-8">
      <HeaderGame namePage="Dashboard" />
      <div className="container space-y-6">
        <div className="flex gap-6 mt-8 cursor-grab overflow-hidden min-h-36">
          <CardDashboard
            icon={MdWarningAmber}
            onClick={() => canManageCRUDReports && updateSection("reports")}
            type={choseType("reports", canManageCRUDReports)}
            title="Problemas relatados"
            value="245"
          />

          <CardDashboard
            icon={MdFormatListNumbered}
            onClick={() => canManageCRUDPlayer && updateSection("players")}
            type={choseType("players", canManageCRUDPlayer)}
            title="Quantidade de jogadores totais"
            value="1.035"
          />

          <CardDashboard
            icon={MdAdminPanelSettings}
            onClick={() => canViewAllAdmin && updateSection("admins")}
            type={choseType("admins", canViewAllAdmin)}
            title="Administradores"
            value="1.035"
          />

          <CardDashboard
            icon={MdBarChart}
            onClick={() => updateSection("statistic")}
            type={choseType("statistic", true)}
            title="Estatísticas de exercícios"
            value="1.035"
          />
        </div>
        <div className="bg-primary-200 p-8 rounded-xl space-y-8">{content}</div>
      </div>
    </main>
  );
};
