import { InputHTMLAttributes, forwardRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";

import theme from "../../../service/tailwindTheme";

type ItemProps = { name: string; value: string };

type Props = {
  list: ItemProps[];
  text: string;
  classNameDiv: string;
};

type PowerSelectProps = InputHTMLAttributes<HTMLInputElement> & Props;

export const PowerSelect = forwardRef(
  ({ className, classNameDiv, list, text, ...rest }: PowerSelectProps, ref) => {
    return (
      <div
        className={twMerge("flex items-center relative w-max", classNameDiv)}
      >
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
            <option className="bg-primary-400" value={item.value}>
              {item.name}
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
