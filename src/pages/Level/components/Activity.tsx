export const Activity = () => {
  const data = {
    capter: 1,
    level: 3,
    title: "Comandos básicos",
    command: "git add",
  };

  return (
    <>
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
    </>
  );
};
