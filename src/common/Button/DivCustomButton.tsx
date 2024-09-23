import { Button } from "./ButtonCustomn/Button";
import { ButtonOutline } from "./ButtonCustomn/ButtonOutline";
import { DivButton } from "./DivButton";

type Props = {
  callbackSuccess: (list: string[]) => void;
  callbackClose: () => void;
  textCancel?: string;
  className?: string;
  textMain?: string;
};

export const DivCustomButton = ({
  callbackSuccess,
  callbackClose,
  textCancel,
  className,
  textMain,
}: Props) => {
  const classCss = className || "w-1/2";
  return (
    <DivButton>
      <>
        <ButtonOutline
          onClick={callbackClose}
          className={classCss}
          title={textCancel}
        />
        <Button
          className={classCss}
          onClick={() => {
            callbackSuccess();
            callbackClose();
          }}
          title={textMain}
        />
      </>
    </DivButton>
  );
};
