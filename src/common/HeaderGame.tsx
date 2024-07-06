import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";

import { MenuActionUser as MenuAction } from "./MenuActionUser";
import theme from "../service/tailwindTheme";
import { useAuth } from "../AuthContext";
import { VITE_API_URL } from "../env";

type HeaderGameProps = {
  namePage: string;
  notRedirect?: boolean;
};

export const HeaderGame = ({ namePage, notRedirect }: HeaderGameProps) => {
  const { user } = useAuth();
  const imgUrl = VITE_API_URL + user?.picture;

  return (
    <header className="bg-primary-600 text-primary-100 py-4">
      <div className="container flex justify-between items-center w-full gap-4">
        <Link
          to={!notRedirect ? "/all_capters" : ""}
          className="flex items-center gap-6"
        >
          {!notRedirect && (
            <GoArrowLeft size={26} color={theme.colors.primary[100]} />
          )}
          <h1 className="font-bold text-2xl">{namePage}</h1>
        </Link>

        <div className="flex items-center gap-4 relative">
          {user?.name ||
            (user?.type == "anonymous" && (
              <p className="text-base font-bold hidden md:block">
                {user?.name || "Anonimo"}
              </p>
            ))}

          <label htmlFor="toggle">
            <img
              src={imgUrl}
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
