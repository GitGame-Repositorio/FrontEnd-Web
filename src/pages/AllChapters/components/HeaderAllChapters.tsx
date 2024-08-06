import { bgForStatus } from "../services/services";
import { HeaderGame } from "../../../common/Header/HeaderGame";

type PropsHeader = {
  percentComplete: number | undefined;
};

export const HeaderAllChapters = ({ percentComplete }: PropsHeader) => {
  const textStatus = "text-primary-950 text-base font-bold";
  const colorStatus = "h-6 w-6 rounded-full";

  return (
    <HeaderGame namePage="Capítulos" notRedirect>
      <div className="order-3 flex-wrap w-full 2md:w-fit">
        <hr className="h-px w-full bg-primary-400 2md:hidden mb-3" />
        <div className="flex flex-wrap sm:flex-nowrap gap-3">
          <div className="justify-self-start w-full md:w-2/5 2md:w-40 lg:w-56 bg-primary-100 py-2.5 px-3 space-y-3 sm:space-y-0 rounded-xl">
            <span className="flex justify-between w-full text-primary-950 text-base font-bold">
              <p>Progresso</p>
              <p>{percentComplete}%</p>
            </span>
            <div className="h-2.5 w-2/3 md:w-full bg-primary-400 rounded-lg">
              <div
                style={{ width: `${percentComplete}%` }}
                className={`h-full rounded-lg bg-primary-800 lg:bg-primary-300`}
              />
            </div>
          </div>

          <div className="bg-primary-100 border-solid h-full w-full md:w-3/5 2md:w-max border-primary-600 rounded-xl p-4 2xl:p-6 justify-self-center content-center">
            <div className="content-center">
              <span className="flex items-center gap-1 pr-4">
                <p className={`${textStatus} w-max`}>A fazer</p>
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
        </div>
      </div>
    </HeaderGame>
  );
};
