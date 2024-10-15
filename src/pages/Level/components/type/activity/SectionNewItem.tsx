import { MdAdd } from "react-icons/md";
import theme from "../../../../../service/tailwindTheme";
import { ComponentProps } from "../common/EditItem";

export const SectionNewItem = ({ openModal }: ComponentProps) => {
  return (
    <div
      className="bg-primary-200 rounded-2xl border-2 border-dashed border-primary-600 content-center cursor-pointer"
      onClick={openModal}
    >
      <MdAdd color={theme.colors.primary[600]} size={40} />
    </div>
  );
};
