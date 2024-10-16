type HeaderProps = {
  chapter: number;
  level: number;
  onReportCallback: (
    event: React.SyntheticEvent<HTMLButtonElement, Event>
  ) => void;
};

export const HeaderLevel = ({
  onReportCallback,
  chapter,
  level,
}: Partial<HeaderProps>) => {
  const classDivButton =
    "py-2.5 px-4 rounded-lg bg-primary-600 text-primary font-medium";
  return (
    <header className="flex justify-between">
      <button
        onClick={onReportCallback}
        className="btn bg-primary-600 text-primary font-medium"
      >
        RELATAR PROBLEMAS
      </button>

      <div className="flex gap-3">
        <div className={classDivButton}>Capitulo | {chapter}</div>
        <div className={classDivButton}>Nível | {level}</div>
      </div>
    </header>
  );
};
