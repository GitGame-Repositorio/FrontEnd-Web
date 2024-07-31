import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";

import { MenuActionUser as MenuAction } from "./MenuActionUser";
import theme from "../../service/tailwindTheme";
import { useAuth } from "../../AuthContext";
import { ReactElement } from "react";

type HeaderGameProps = {
  namePage: string;
  notRedirect?: boolean;
  children?: ReactElement;
};

export const HeaderGame = ({
  namePage,
  notRedirect,
  children,
}: HeaderGameProps) => {
  const { user, imgPerfil } = useAuth();

  return (
    <header className="bg-primary-600 text-primary-100 py-4">
      <div className="container flex flex-wrap justify-between items-center w-full gap-4 order-2">
        <Link
          to={!notRedirect ? "/all-capters" : ""}
          className="flex items-center gap-3 sm:gap-6 order-1"
        >
          {!notRedirect && (
            <GoArrowLeft size={26} color={theme.colors.primary[100]} />
          )}
          <h1 className="font-bold text-base sm:text-2xl">{namePage}</h1>
        </Link>

        {children}

        <div className="flex items-center gap-2 sm:gap-4 relative order-2 md:order-3">
          {user?.name ||
            (user?.type == "anonymous" && (
              <p className="text-xl sm:text-base font-bold hidden md:block">
                {user?.name || "Anonimo"}
              </p>
            ))}

          <label htmlFor="toggle">
            <img
              src={imgPerfil}
              alt="Perfil"
              className="h-12 w-12 rounded-full cursor-pointer img-menu-action"
            />

            <input
              id="toggle"
              type="checkbox"
              className="checkbox-menu-action hidden"
            />

            <MenuAction />
          </label>
        </div>
      </div>
    </header>
  );
};
