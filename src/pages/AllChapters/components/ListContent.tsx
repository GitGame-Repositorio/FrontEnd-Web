import { OrderLevel } from "../../../@types/game.d";
import { organizeOrder } from "../services/services";
import { ContentRemap } from "../type/remap";
import { ButtonContent } from "./ContentButton";

type ListContentProps = {
  listContent: ContentRemap[];
};

export const ListContent = ({ listContent }: ListContentProps) => {
  let isOpen = true;
  return (
    <ul className="flex gap-4 md:gap-8 overflow-x-auto scroll-custom">
      {listContent?.sort(organizeOrder).map((content: OrderLevel) => {
        const prevIsOpen = isOpen;
        if (!content?.complete && isOpen) {
          isOpen = false;
        }
        return (
          <ButtonContent
            key={content.id}
            content={content}
            isOpen={prevIsOpen}
          />
        );
      })}
    </ul>
  );
};
