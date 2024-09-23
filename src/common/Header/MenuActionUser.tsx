import { Link } from "react-router-dom";
import { MdExitToApp, MdOutlineSave, MdOutlineSettings, MdSave } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuSaveAll } from "react-icons/lu";

import theme from "../../service/tailwindTheme";
import { useAuth } from "../../AuthContext";

export const MenuActionUser = () => {
  const { user, logout, isAdmin, isLogged } = useAuth();

  const styleItemMenu =
    "flex gap-2 items-center rounded-md p-1.5 hover:bg-primary-300";

  const colorIcons = theme.colors.primary[600];

  return (
    <div className="absolute top-[2.58rem] right-0 sm:-right-4 menu-action flex flex-col min-w-50">
      <div className="h-5 sm:h-9 top-[2.58rem] right-0"></div>
      <div className="h-max z-10 flex flex-col text-start gap-2 py-4 px-3 font-bold bg-primary-200 rounded-2xl border border-solid border-primary-500 text-primary-800">
        {isAdmin && user?.admin?.canManageContentGame && (
          <>
            <Link to="/dashboard" className={styleItemMenu}>
              <LuLayoutDashboard size={22} color={colorIcons} />
              Dashboard
            </Link>
            <hr className="h-px w-full bg-primary-500" />
          </>
        )}

        {isLogged && (
          <>
            <Link to="/user" className={styleItemMenu}>
              <MdOutlineSettings size={22} color={colorIcons} />
              Configurações
            </Link>
            <hr className="h-px w-full bg-primary-500" />
          </>
        )}

        {!isLogged && (
          <>
            <Link to="/add-email" onClick={() => {}} className={styleItemMenu}>
              <MdOutlineSave size={22} color={colorIcons} />
              Salvar Progresso
            </Link>
            <hr className="h-px w-full bg-primary-500" />
          </>
        )}

        <Link to="/" onClick={logout} className={styleItemMenu}>
          <MdExitToApp size={22} color={colorIcons} />
          {isLogged ? "Sair" : "Sair e Resetar"}
        </Link>
      </div>
    </div>
  );
};
