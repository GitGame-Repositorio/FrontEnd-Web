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
    <div className="grid grid-cols-3 items-center gap-4">
      <div className="justify-self-start bg-primary-600 p-3 space-y-3 rounded-xl">
        <span className="flex justify-between text-primary-50 text-base font-bold">
          <p>Progresso</p>
          <p>{percentComplete}%</p>
        </span>
        <div className="h-2.5 w-50 bg-primary-100 rounded-lg">
          <div
            style={{ width: `${percentComplete}%` }}
            className={`h-full rounded-lg bg-primary-300`}
          />
        </div>
      </div>

      <div className="flex items-center border border-solid border-primary-600 rounded-xl p-4 2xl:p-6 justify-self-center">
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

      <div className="flex items-center gap-4 justify-self-end">
        {user?.name && (
          <p className="text-base text-primary-800 font-bold">{user?.name}</p>
        )}
        {user?.type == "anonymous" && (
          <p className="text-base text-primary-800 font-bold">{"Anonimo"}</p>
        )}
        <img
          src={imgUrl}
          alt="Imagem de Perfil"
          className="h-14 w-14 rounded-full"
        />
      </div>
    </div>
  );
};
