import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import { VITE_API_URL } from "../../../env";
import { bgForStatus } from "../services/services";
import theme from "../../../service/tailwindTheme";

import { GoGear } from "react-icons/go";
import { MdExitToApp } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { useState } from "react";

type PropsHeader = {
  percentComplete: number | undefined;
};

export const HeaderAllCapters = ({ percentComplete }: PropsHeader) => {
  const { user, logout } = useAuth();
  const imgUrl = VITE_API_URL + user?.picture;

  const [menuVisible, setMenuVisible] = useState(false);

  const textStatus = "text-primary-950 text-base font-bold";
  const colorStatus = "h-6 w-6 rounded-full";

  return (
    <div className="bg-primary-600 lg:bg-primary-100 py-5 md:py-10 lg:py-5">
      <div className="container grid md:grid-cols-2 lg:grid-cols-3 items-center gap-4">
        <div className="justify-self-start w-full lg:w-56 bg-primary-100 lg:bg-primary-600 p-3 space-y-3 rounded-xl">
          <span className="flex justify-between w-full text-primary-950 lg:text-primary-50 text-base font-bold">
            <p>Progresso</p>
            <p>{percentComplete}%</p>
          </span>
          <div className="h-2.5 w-2/3 md:w-full bg-primary-400 lg:bg-primary-100 rounded-lg">
            <div
              style={{ width: `${percentComplete}%` }}
              className={`h-full rounded-lg bg-primary-800 lg:bg-primary-300`}
            />
          </div>
        </div>

        <div className="bg-primary-100 lg:border border-solid w-full lg:w-max h-full border-primary-600 rounded-xl p-4 2xl:p-6 justify-self-center content-center">
          <div className="content-center">
            <span className="flex items-center gap-1 pr-4">
              <p className={textStatus}>A fazer</p>
              <div className={`${colorStatus} ${bgForStatus["TO_DO"]}`} />
            </span>
            <span className="flex items-center gap-1 px-4 border-x border-solid border-primary-600">
              <p className={textStatus}>Fazendo</p>
              <div
                className={`${colorStatus} ${bgForStatus["IN_PROGRESS"]}`}
              ></div>
            </span>
            <span className="flex items-center gap-1 pl-4">
              <p className={textStatus}>Feito</p>
              <div
                className={`${colorStatus} ${bgForStatus["COMPLETED"]}`}
              ></div>
            </span>
          </div>
        </div>

        <div className="flex relative justify-between w-full lg:justify-end justify-self-end order-first md:col-span-3 lg:col-span-1 lg:order-last pb-4 lg:pb-0 border-b lg:border-b-0 border-solid border-primary-400">
          <button className="py-3 px-6 flex items-center rounded-2xl gap-2 font-bold text-primary-600 bg-primary-100 lg:hidden">
            SANDBOX
            <img src="/sandbox.svg" />
          </button>
          <div className="flex items-center gap-4">
            {user?.name ||
              (user?.type == "anonymous" && (
                <p className="text-base text-primary-800 font-bold hidden md:block">
                  {user?.name || "Anonimo"}
                </p>
              ))}

            <img
              src={imgUrl}
              alt="Imagem de Perfil"
              className="h-14 w-14 rounded-full cursor-pointer"
              onClick={() => setMenuVisible(!menuVisible)}
            />

            {menuVisible && (
              <div className="absolute top-18 right-0 min-w-50 z-10 flex flex-col text-start gap-4 py-4 px-3 font-bold bg-primary-200 rounded-2xl border border-solid border-primary-500">
                <Link to="/dashboard" className="flex gap-1 items-center">
                  <LuLayoutDashboard
                    size={22}
                    color={theme.colors.primary[500]}
                  />
                  Dashboard
                </Link>
                <Link
                  to="/user"
                  className="flex gap-1 items-center w-full py-3 border-y border-solid border-primary-500"
                >
                  <GoGear size={22} color={theme.colors.primary[500]} />
                  Configurações
                </Link>
                <Link
                  to="/main"
                  onClick={logout}
                  className="flex gap-1 items-center"
                >
                  <MdExitToApp size={22} color={theme.colors.primary[500]} />
                  Sair
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
