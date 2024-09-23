import { MdSearch } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes } from "react";

import theme from "../service/tailwindTheme";

export const Search = ({
  className,
  children,
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex gap-2">
      <div className="relative w-full">
        <input
          type="text"
          className={twMerge(
            "h-12 w-full bg-primary-100 pl-4 pr-12 py-3 rounded-lg text-primary-800 focus:outline focus:outline-primary-800 placeholder:text-primary-400",
            className
          )}
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
