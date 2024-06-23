import { IoCheckmarkSharp } from "react-icons/io5";
import theme from "../service/tailwindTheme";

type MessageProps = {
  text: string;
  className: React.ComponentProps<"div">["className"];
};

export const Message = ({ text, className }: MessageProps) => {
  const classDiv =
    "max-h-20 pr-1 w-full max-w-128 rounded-2xl bg-primary-50 flex gap-6 absolute animate-message";
  return (
    <div className={`${classDiv} ${className}`}>
      <div className="w-4 bg-primary-500 rounded-l-2xl" />
      <div className="flex items-center gap-4">
        <IoCheckmarkSharp size={25} color={theme.colors.primary[500]} />
        <p className="text-primary-500 text-2xl font-bold py-4 2xl:py-5">
          {text}
        </p>
      </div>
    </div>
  );
};
