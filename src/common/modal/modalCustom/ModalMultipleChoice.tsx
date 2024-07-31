import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { DivButton } from "../../../pages/auth/components/DivButton";
import { Modal } from "../Modal";
import theme from "../../../service/tailwindTheme";
import { useState } from "react";

export type ModalMultipleChoiceProps = {
  title: string;
  isVisible: boolean;
  limitSelect: number;
  listValuesSelect: string[];
  listValues: PropsObjValues[];
  arroz: string;
  callbackClose: () => void;
  updateSelect: (value: string[]) => void;
};

type PropsObjValues = {
  name: string;
  value: string;
};

export const ModalMultipleChoice = ({
  title,
  listValues,
  listValuesSelect,
  updateSelect,
  limitSelect,
  ...rest
}: ModalMultipleChoiceProps) => {
  const [selectItem, setSelectItem] = useState<string[]>(listValuesSelect);
  const { callbackClose } = rest;

  const updateList = (value: string) => {
    const newList = selectItem.includes(value)
      ? selectItem.filter((item: string) => item !== value)
      : [...selectItem, value];
    if (limitSelect && newList.length > limitSelect) return null;
    setSelectItem(newList);
  };

  return (
    <Modal {...rest} className="w-80 font-medium">
      <p>{title}</p>

      <hr className="line-custom" />

      <ul>
        {listValues.map(({ name, value }: PropsObjValues) => {
          const isChecked = selectItem.includes(value);
          const classOpacity =
            !isChecked && selectItem.length >= limitSelect ? "opacity-50" : "";
          const CheckBox = isChecked
            ? MdOutlineCheckBox
            : MdOutlineCheckBoxOutlineBlank;
          return (
            <li key={`modal-${value}`}>
              <label
                className={`inline-flex items-center gap-2 cursor-pointer ${classOpacity}`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isChecked}
                  onChange={() => updateList(value)}
                />
                <CheckBox
                  size={20}
                  className="cursor-pointer"
                  color={theme.colors.primary[600]}
                />
                {name}
              </label>
            </li>
          );
        })}
      </ul>

      <DivButton
        linkCancel="#"
        textButton="Salvar"
        textCancel="Cancelar"
        classButtonCancel="text-primary-600 border-primary-600 hover:bg-primary-600 hover:text-primary-100"
        propsButtonCancel={{
          onClick: callbackClose,
        }}
        propsButtonMain={{
          onClick: () => {
            updateSelect(selectItem);
            callbackClose();
          },
        }}
      />
    </Modal>
  );
};
