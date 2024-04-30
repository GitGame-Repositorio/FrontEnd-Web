import { HeaderGame } from "../common/HeaderLevel";

export const Activity = () => {
  const data = {
    capter: 1,
    level: 3,
    title: "Comandos básicos",
    command: "git add",
  };
  return (
    <main className="py-14 px-24 bg-primary-800 space-y-12 min-h-screen">
      <HeaderGame capter={data.capter} level={data.level} />
      <div className="space-y-4">
        <h1 className="text-primary text-4xl font-bold">
          {data.capter} - {data.title}
        </h1>
        <div className="py-2 px-8 border-2 border-solid border-primary text-primary text-2xl inline-block rounded-2xl">
          {data.command.replace("git", "Git")}
        </div>
      </div>
      <div className="grid gap-y-4 gap-x-8 grid-cols-2 grid-rows-2">
        <div className="div-game">
          <h2 className="font-bold text-2xl">Objetivos da atividade:</h2>
          <ul className="text-base">
            <li>Criar novo arquivo chamado red.txt</li>
            <li>Escrever algum nesse arquivo</li>
            <li>Utilizar o git add nesse arquivo</li>
          </ul>
        </div>
        <div className="div-game row-span-2">Árvore Git</div>
        <div className="div-game h-36">Terminal</div>
      </div>
    </main>
  );
};
