import { HTMLAttributes } from "react";

type Props = {
  text: string;
} & HTMLAttributes<HTMLButtonElement>;

export const ButtonMenuFloat = ({ text }: Props) => {
  return (
    <label className="w-max">
      <div className="btn bg-primary-500 w-max text-primary font-bold uppercase peer-checked:bg-primary-100 select-none">
        {text}
      </div>
      <input type="checkbox" className="peer hidden" />
    </label>
  );
};
