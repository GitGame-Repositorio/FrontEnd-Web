import { VITE_API_URL } from "../env";
import { useAuth } from "../AuthContext";
import { MenuProps } from "./menuAction/useMenuAction";
import { GoArrowLeft } from "react-icons/go";
import theme from "../service/tailwindTheme";
import { Link } from "react-router-dom";

type HeaderGameProps = {
  menuActionHook: MenuProps;
  namePage: string;
  notRedirect?: boolean;
};

export const HeaderGame = ({
  menuActionHook,
  namePage,
  notRedirect,
}: HeaderGameProps) => {
  const { user } = useAuth();
  const imgUrl = VITE_API_URL + user?.picture;

  const { MenuAction, changeMenuVisible, openMenu } = menuActionHook;

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

          <img
            src={imgUrl}
            alt="Perfil"
            className="h-12 w-12 rounded-full cursor-pointer"
            onClick={changeMenuVisible}
            onMouseOver={openMenu}
            data-menu="active"
          />

          <MenuAction />
        </div>
      </div>
    </header>
  );
};
