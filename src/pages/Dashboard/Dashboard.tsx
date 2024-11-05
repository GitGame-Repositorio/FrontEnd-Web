import {
  MdBarChart,
  MdWarningAmber,
  MdFormatListNumbered,
  MdAdminPanelSettings,
} from "react-icons/md";
import { ReactElement, useState } from "react";

import { HeaderGame } from "../../common/Header/HeaderGame";
import { ReportsContent } from "./components/content/ReportsContent";
import { PlayerContent } from "./components/content/PlayerContent";
import { AdminContent } from "./components/content/AdminContent";
import { StatisticsContent } from "./components/content/StatisticsContent";
import { CardDashboard } from "./components/card/CardDashboard";
import { useAuth } from "../../AuthContext";
import { DivHold } from "../../common/DivHold";
import { useResource } from "../../common/useResource";
import { DashboardStatistics } from "../../@types/statistics";
import { Loading } from "../Loading";

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

  const { user, reloadPage } = useAuth();

  const statistic = useResource<DashboardStatistics>("/statistics/dashboard", [
    reloadPage.register,
  ]);

  if (!statistic) return <Loading />;

  const { canManageCRUDReports, canManageCRUDPlayer, canViewAllAdmin } =
    user?.admin || {};

  const updateSection = (name: SectionKeys) => {
    localStorage.setItem("sectionDashboard", name);
    const newSection = sectionDashboard[name];
    setContent(newSection);
  };

  const choseType = (text: SectionKeys, access: boolean | undefined) =>
    section === text ? "actual" : access ? "access" : "block";

  const getValueForType = (obj) => (obj.props.type === "block" ? 0 : 1);
  const orderForActive = (objA, objB) =>
    getValueForType(objB) - getValueForType(objA);

  return (
    <main className="pb-8">
      <HeaderGame namePage="Dashboard" />
      <div className="container space-y-6">
        <DivHold className="flex gap-6 mt-8 min-h-36">
          {...[
            <CardDashboard
              icon={MdWarningAmber}
              onClick={() => canManageCRUDReports && updateSection("reports")}
              type={choseType("reports", canManageCRUDReports)}
              title="Problemas relatados"
              value={statistic?.report}
            />,

            <CardDashboard
              icon={MdFormatListNumbered}
              onClick={() => canManageCRUDPlayer && updateSection("players")}
              type={choseType("players", canManageCRUDPlayer)}
              title="Quantidade de jogadores totais"
              value={statistic?.player}
            />,

            <CardDashboard
              icon={MdAdminPanelSettings}
              onClick={() => canViewAllAdmin && updateSection("admins")}
              type={choseType("admins", canViewAllAdmin)}
              title="Administradores"
              value={statistic?.admin}
            />,

            <CardDashboard
              icon={MdBarChart}
              onClick={() => updateSection("statistic")}
              type={choseType("statistic", true)}
              title="Estatísticas de exercícios"
              value="5"
            />,
          ].sort(orderForActive)}
        </DivHold>
        {content}
      </div>
    </main>
  );
};
