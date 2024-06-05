import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { VITE_API_URL } from "../../env";
import { StatusProgress } from "../../@types/progress";

type PropsHeader = {
  objColors: Record<StatusProgress, string>;
  percentComplete: number | undefined;
};

export const HeaderAllCapters = ({
  objColors,
  percentComplete,
}: PropsHeader) => {
  const { user, isLogged, logout } = useAuth();
  const imgUrl = VITE_API_URL + user?.picture;

  const textStatus = "text-primary-950 text-base font-bold";
  const colorStatus = "h-6 w-6 rounded-full";

  return (
    <div className="flex justify-between items-center">
      <div>
        <p>{isLogged ? "Logado" : "Anonimo"}</p>
        {isLogged && (
          <Link
            to="/login"
            onClick={logout}
            className="text-tertiary cursor-pointer"
          >
            logout
          </Link>
        )}
      </div>

      <div className="flex items-center border border-solid border-primary-600 rounded-xl p-4 2xl:p-6">
        <span className="flex items-center gap-1 pr-4">
          <p className={textStatus}>A fazer</p>
          <div className={`${colorStatus} ${objColors["TO_DO"]}`} />
        </span>
        <span className="flex items-center gap-1 px-4 border-x border-solid border-primary-600">
          <p className={textStatus}>Fazendo</p>
          <div className={`${colorStatus} ${objColors["IN_PROGRESS"]}`}></div>
        </span>
        <span className="flex items-center gap-1 pl-4">
          <p className={textStatus}>Feito</p>
          <div className={`${colorStatus} ${objColors["COMPLETED"]}`}></div>
        </span>
      </div>

      <div className="flex gap-4">
        <img
          src={imgUrl}
          alt="Imagem de Perfil"
          className="h-14 w-14 rounded-full"
        />
        {user?.name && (
          <p className="text-base text-primary-800 font-bold">{user?.name}</p>
        )}
      </div>
    </div>
  );
};
