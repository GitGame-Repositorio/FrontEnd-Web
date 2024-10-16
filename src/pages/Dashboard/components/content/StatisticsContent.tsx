import { ReactElement, useEffect, useState } from "react";
import {
  ChapterStatistics,
  LevelStatistics,
  PlayerStatistics,
} from "../../../../@types/statistics";
import { Search } from "../../../../common/Search";
import { useResource } from "../../../../common/useResource";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

import theme from "../../../../service/tailwindTheme";
import { MainContent } from "../MainContent";

export const StatisticsContent = () => {
  const [idChapter, setIdChapter] = useState("");
  const [idLevel, setIdLevel] = useState("");
  const statisticsChapter = useResource<ChapterStatistics[]>(
    "/statistics/chapter"
  );
  const statisticsLevel = useResource<OptionStatisticType[]>(
    `/statistics/level?id_chapter=${idChapter}`,
    [idChapter]
  );
  const statisticsContent = useResource<OptionStatisticType[]>(
    `/statistics/content?id_level=${idLevel}`,
    [idLevel]
  );

  return (
    <>
      <StatisticsUserContent />
      <MainContent>
        <div className="flex flex-col gap-8">
          <div className="space-y-3">
            <Search />
          </div>

          <StatisticsGameContent
            name="Capítulo"
            allStatistics={statisticsChapter || []}
            funcFilter={(obj, num) => obj.numberOrder === num}
            updateID={setIdChapter}
          />

          <StatisticsGameContent
            name="Level"
            allStatistics={statisticsLevel || []}
            funcFilter={(obj, num) => obj.numberOrder === num}
            updateID={setIdLevel}
          />

          <StatisticsGameContent
            name="Conteúdo"
            allStatistics={statisticsContent || []}
            funcFilter={(obj, num) => obj.order === num}
          />
        </div>
      </MainContent>
    </>
  );
};

export const StatisticsUserContent = () => {
  const statistics = useResource<PlayerStatistics>("/statistics/allPlayers");
  return (
    <MainContent>
      <div className="space-y-3">
        <CardStatisticContent
          name="Quantidade de jogadores"
          value={`${statistics?.countUser} Jogadores`}
        />
        <CardStatisticContent
          name="Usuários logados"
          value={`${statistics?.countPlayer} Usuários`}
        />
        <CardStatisticContent
          name="Porcentagem de usuários logados"
          value={statistics?.percentPlayerLogged + "%"}
        />
        <CardStatisticContent
          name="Total de usuários que finalizaram o jogo"
          value={`${statistics?.countUserFinishingGame} Jogadores`}
        />
        <CardStatisticContent
          name="Porcentagem geral de usuários que finalizaram o jogo"
          value={statistics?.percentUserFinishingGame + "%"}
        />
      </div>
    </MainContent>
  );
};

type OptionStatisticType = ChapterStatistics | LevelStatistics;

type PropsGameContent = {
  funcFilter: (obj: OptionStatisticType, num: number) => boolean;
  updateID?: (value: string) => void;
  allStatistics: OptionStatisticType[];
  name: string;
};

export const StatisticsGameContent = ({
  allStatistics,
  funcFilter,
  updateID,
  name,
}: PropsGameContent) => {
  const [number, setNumber] = useState(1);

  useEffect(() => {
    setNumber(1);
  }, [allStatistics]);

  const statistic: OptionStatisticType = allStatistics?.find((obj) =>
    funcFilter(obj, number)
  );
  updateID?.(statistic?.id);

  const limit: number = allStatistics?.length || 0;
  const updateNumber = (numberSum: number) => {
    const newNumber = number + numberSum;
    if (newNumber < 1 || newNumber > limit) {
      return null;
    }
    setNumber(newNumber);
  };

  const [isExpansive, setIsExpansive] = useState(true);

  const {
    countUserCompleat,
    countUserNotCompleat,
    percentUserCompleat,
    timeForCompleat,
    title,
  } = statistic || {};

  return (
    <div className="space-y-3">
      <CardStatisticContent name={name} value={title}>
        <ChangeNumberOrder number={number} update={updateNumber} />
      </CardStatisticContent>
      <CardStatisticContent
        name="Total de usuários que finalizaram"
        value={`${countUserCompleat}/${countUserNotCompleat} | ${percentUserCompleat}%`}
      />
      <CardStatisticContent
        name="Tempo médio para finalizar capítulo"
        value={timeForCompleat}
      />
    </div>
  );
};

type CardProps = {
  name: string;
  value: string;
  children?: ReactElement;
};

export const CardStatisticContent = ({ name, value, children }: CardProps) => {
  return (
    <span className="bg-primary-300 px-6 py-3 flex justify-between gap-2 text-xl rounded-lg">
      <p className="text-primary-800 font-bold">{name}</p>
      <div className="flex gap-4">
        <p className="text-primary-600">{value}</p>
        {children}
      </div>
    </span>
  );
};

type PropsChangeNumber = {
  number: number;
  update: (int: number) => void;
};

export const ChangeNumberOrder = ({ number, update }: PropsChangeNumber) => {
  const colorArrow = theme.colors.primary[800];
  return (
    <div className="flex bg-primary-200 text-xl rounded-md">
      <button className="px-1.5" onClick={() => update(-1)}>
        <MdArrowLeft color={colorArrow} size={22} />
      </button>
      <p className="text-primary-600 font-bold px-1">{number}</p>
      <button className="px-1.5" onClick={() => update(1)}>
        <MdArrowRight color={colorArrow} size={22} />
      </button>
    </div>
  );
};
