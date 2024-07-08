import { Link } from "react-router-dom";
import { MdOutlineSettings } from "react-icons/md";
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { LuSaveAll } from "react-icons/lu";

import theme from "../../service/tailwindTheme";
import { useAuth } from "../../AuthContext";

export const MenuActionUser = () => {
  const { user, logout, isAdmin, isLogged } = useAuth();

  const styleItemMenu =
    "flex gap-2 items-center rounded-md p-1.5 hover:bg-primary-300";

  const colorIcons = theme.colors.primary[600];

  return (
    <div className="absolute top-18 right-0 min-w-50 z-10 flex flex-col text-start gap-2 py-4 px-3 font-bold bg-primary-200 rounded-2xl border border-solid border-primary-500 text-primary-800">
      {!isLogged && (
        <>
          <Link to="/add-email" onClick={() => {}} className={styleItemMenu}>
            <LuSaveAll size={22} color={colorIcons} />
            Salvar Progresso
          </Link>
          <hr className="h-px w-full bg-primary-500" />
        </>
      )}

      {isAdmin && user?.admin?.canManageContentGame && (
        <>
          <Link to="/dashboard" className={styleItemMenu}>
            <LuLayoutDashboard size={22} color={colorIcons} />
            Dashboard
          </Link>
          <hr className="h-px w-full bg-primary-500" />
        </>
      )}

      <Link to="/user" className={styleItemMenu}>
        <MdOutlineSettings size={22} color={colorIcons} />
        Configurações
      </Link>
      <hr className="h-px w-full bg-primary-500" />

      <Link to="/" onClick={logout} className={styleItemMenu}>
        <LuLogOut size={22} color={colorIcons} />
        {isLogged ? "Sair" : "Sair e Resetar"}
      </Link>
    </div>
  );
};
