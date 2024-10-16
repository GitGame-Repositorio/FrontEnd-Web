import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { DivButton } from "../../../pages/auth/components/DivButton";
import { Modal } from "../Modal";
import theme from "../../../service/tailwindTheme";
import { useState } from "react";

export type ModalUniqueChoiceProps = {
  title: string;
  isVisible: boolean;
  valueSelect?: PropsObjValues;
  listValues: PropsObjValues[];
  callbackClose: () => void;
  updateSelect: (value: PropsObjValues) => void;
};

type PropsObjValues = {
  name: string;
  value: string;
};

export const ModalUniqueChoice = ({
  updateSelect,
  valueSelect,
  listValues,
  ...rest
}: ModalUniqueChoiceProps) => {
  const [selectItem, setSelectItem] = useState<PropsObjValues>(
    valueSelect || { name: "", value: "" }
  );

  const { callbackClose } = rest;

  return (
    <Modal {...rest} className="w-80 font-medium">
      <ul>
        {listValues.map((obj: PropsObjValues) => {
          const { name, value } = obj;

          const isChecked = selectItem?.value?.includes(value);

          const SelectBox = isChecked
            ? MdRadioButtonChecked
            : MdRadioButtonUnchecked;

          return (
            <li key={`modal-${value}`}>
              <label
                className={`inline-flex items-center gap-2 cursor-pointer`}
              >
                <input
                  type="radio"
                  value={value}
                  className="hidden"
                  checked={isChecked}
                  onChange={() => setSelectItem(obj)}
                />
                <SelectBox
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
