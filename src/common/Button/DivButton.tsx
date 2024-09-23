import { HTMLAttributes, ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import { ButtonOutline } from "./ButtonCustomn/ButtonOutline";
import { Button } from "./ButtonCustomn/Button";

type DivProps = {
  buttonCancel?: ReactElement;
  buttonMain?: ReactElement;
  children?: ReactElement;
};

export const DivButton = ({
  className,
  buttonCancel,
  buttonMain,
  children,
}: HTMLAttributes<HTMLButtonElement> & DivProps) => {
  const buttonCancelChose = buttonCancel || <ButtonOutline />;
  const buttonMainChose = buttonMain || <Button />;
  return (
    <div className={twMerge("flex gap-4", className)}>
      {children ? (
        children
      ) : (
        <>
          {buttonCancelChose}
          {buttonMainChose}
        </>
      )}
    </div>
  );
};
