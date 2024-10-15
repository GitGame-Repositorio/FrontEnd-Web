import { InputTextLine } from "../../../../Dashboard/components/InputTextLine";
import { DivInput } from "../../../../../common/Input/DivInput";
import { FieldErrors, UseFormReturn } from "react-hook-form";

type Props = {
  errors: FieldErrors;
};

export const TitleEdit = ({ register, errors }: Props & UseFormReturn) => {
  return (
    <DivInput
      label="Título"
      error={errors.title}
      className="rounded-2xl inline-block p-4 w-full bg-primary-200"
    >
      <InputTextLine className="pb-3.5 font-normal" {...register("title")} />
    </DivInput>
  );
};
