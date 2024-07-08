import { IconType } from "react-icons";
import { BsThreeDots } from "react-icons/bs";
import theme from "../service/tailwindTheme";

type CardProps = {
  icon: IconType;
  title: string;
  value: string;
  onClick: () => void;
};

export const Card = ({ icon: Icon, title, value, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-primary-800 py-3 px-6 rounded-xl min-w-80 h-max"
    >
      <div className="flex justify-between gap-2 mb-2.5">
        <Icon size={24} color={theme.colors.primary[400]} />
        <BsThreeDots
          size={24}
          color={theme.colors.primary[400]}
          className="cursor-pointer"
        />
      </div>
      <div className="space-y-2.5 font-bold text-primary">
        <p className="text-base">{title}</p>
        <p className="text-2xl">{value}</p>
      </div>
    </div>
  );
};
