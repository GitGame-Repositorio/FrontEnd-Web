import { OrderLevel } from "../../../@types/game.d";
import { ContentProgress } from "../../../@types/progress.d";
import { organizeOrderNumber } from "../services/services";
import { Button } from "./ContentButton";

type ListContentProps = {
  listContent: OrderLevel[];
  listProgress: ContentProgress[] | undefined;
};

export const ListContent = ({
  listContent,
  listProgress,
}: ListContentProps) => {
  let isOpen = true;
  return (
    <ul className="flex gap-4 md:gap-8 overflow-x-auto scroll-custom">
      {listContent?.sort(organizeOrderNumber).map((content: OrderLevel) => {
        const levelContent = listProgress?.find(
          (data: ContentProgress) => content.id === data.id_order_level
        );
        const prevIsOpen = isOpen;
        if (levelContent?.status !== "COMPLETED" && isOpen) {
          isOpen = false;
        }
        return (
          <Button
            key={content.id}
            content={content}
            progress={levelContent}
            isOpen={prevIsOpen}
          />
        );
      })}
    </ul>
  );
};
