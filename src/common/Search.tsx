import { MdSearch } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes } from "react";

import theme from "../service/tailwindTheme";

type Props = {
  text: string;
  setText: (str: string) => void;
};

export const Search = ({
  className,
  children,
  setText,
  text,
}: InputHTMLAttributes<HTMLInputElement> & Props) => {
  return (
    <div className="flex gap-2">
      <div className="relative w-full">
        <input
          type="text"
          className={twMerge(
            "h-12 w-full bg-primary-100 pl-4 pr-12 py-3 rounded-lg text-primary-800 focus:outline focus:outline-primary-800 placeholder:text-primary-400",
            className
          )}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Pesquisar..."
        />
        <MdSearch
          size={22}
          onClick={() => {}}
          color={theme.colors.primary[400]}
          className="absolute top-3.5 right-5"
        />
      </div>
      {children}
    </div>
  );
};
