import { InputHTMLAttributes, forwardRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";

import theme from "../../../service/tailwindTheme";

type Props = {
  list: string[];
  text: string;
};

type PowerSelectProps = InputHTMLAttributes<HTMLInputElement> & Props;

export const PowerSelect = forwardRef(
  ({ className, list, text, ...rest }: PowerSelectProps, ref) => {
    return (
      <div className="flex items-center relative">
        <select
          className={twMerge(
            "h-12 bg-primary-200 pl-4 pr-10 rounded-lg text-primary-800 focus:outline focus:outline-primary-400 placeholder:text-primary-600 appearance-none border border-solid border-primary-600 font-bold cursor-pointer",
            className
          )}
          ref={ref}
          {...rest}
        >
          <option className="bg-primary-400" selected disabled>
            {text || "Selecione"}
          </option>

          {list.map((item) => (
            <option className="bg-primary-400" value={item}>
              {item}
            </option>
          ))}
        </select>
        <IoIosArrowDown
          size={20}
          color={theme.colors.primary[800]}
          className="absolute right-4"
        />
      </div>
    );
  }
);
