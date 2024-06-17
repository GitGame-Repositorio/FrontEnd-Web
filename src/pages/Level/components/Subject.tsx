import { Subject as SubjectType } from "../../../@types/game.d";

export const Subject = ({ title, text }: SubjectType) => {
  return (
    <div className="grid gap-y-4 gap-x-8 grid-cols-2 grid-rows-2">
      <div className="div-game">
        <p className="text-base">{text}</p>
      </div>
      <div className="div-game row-span-2">Árvore Git</div>
    </div>
  );
};
