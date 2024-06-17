import { Level } from "../../../@types/game.d";
import { LevelProgress } from "../../../@types/progress.d";
import { organizateOrder } from "../services/services";
import { LevelButton } from "./LevelButton";

type TypeListLevel = {
  listLevel: Level[];
  listLevelProgress: LevelProgress[] | undefined;
};

export const ListLevel = ({ listLevel, listLevelProgress }: TypeListLevel) => {
  let isOpen = true;
  return (
    <ul className="flex gap-8">
      {listLevel.sort(organizateOrder).map((level: Level) => {
        const levelProgress = listLevelProgress?.find(
          (data) => level.id === data.id_level
        );
        const prevIsOpen = isOpen;
        if (levelProgress?.status !== "COMPLETED" && isOpen) {
          isOpen = false;
        }
        return (
          <LevelButton
            key={level.id + level.id_capter}
            level={level}
            levelProgress={levelProgress}
            isOpen={prevIsOpen}
          />
        );
      })}
    </ul>
  );
};
