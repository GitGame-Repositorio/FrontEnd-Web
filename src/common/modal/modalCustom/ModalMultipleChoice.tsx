import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { DivButton } from "../../../pages/auth/components/DivButton";
import { Modal } from "../Modal";
import theme from "../../../service/tailwindTheme";
import { useEffect, useState } from "react";

export type ModalMultipleChoiceProps = {
  title: string;
  listValues: PropsFilter[];
  updateSelect: (list: PropsFilter[]) => void;
};

type PropsObjItem = {
  id?: string;
  update?: (value: PropsFilter) => PropsFilter;
  name: string;
  type: "item";
  value: string;
  select: boolean;
  notInteract?: boolean;
};

type PropsObjMultiple = {
  type: "section";
  listValue: PropsObjMultiple[] & PropsObjItem[];
  handleSelect: (newObj: PropsFilter, list: PropsFilter[]) => PropsFilter[];
  func?: (record: object) => boolean;
};

export type PropsFilter = PropsObjItem & PropsObjMultiple;

type RenderListProps = {
  obj: PropsFilter;
  updateObj: (value: PropsFilter) => void;
};

const RenderList = ({ obj, updateObj }: RenderListProps) => {
  const { name, type, listValue } = obj;

  if (type === "section") {
    return (
      <div className="flex flex-col gap-0.5">
        <p className="mb-0.5 font-bold">{name}</p>
        <ul className="flex flex-col gap-1.5">
          {listValue.map((listObj) => (
            <RenderList obj={listObj} updateObj={updateObj} />
          ))}
        </ul>
      </div>
    );
  }

  const isChecked = obj.select;
  const classOpacity = obj.notInteract ? "opacity-50" : "";

  const CheckBox = isChecked
    ? MdOutlineCheckBox
    : MdOutlineCheckBoxOutlineBlank;

  return (
    <li className="flex">
      <label
        className={`w-full cursor-pointer px-0.5 rounded-md hover:bg-primary-200 inline-flex items-center cursor-pointer gap-2 ${classOpacity}`}
      >
        <input
          type="checkbox"
          className="hidden"
          checked={isChecked}
          disabled={obj.notInteract}
          onChange={() =>
            updateObj(obj?.update({ ...obj, select: !isChecked }))
          }
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
};

const generateID = (obj: PropsFilter, preID: string) => {
  const { listValue: list, type, name } = obj;
  const id = preID ? preID + "/" + name : name;
  if (type === "section") {
    const listValue: any = list.map((item) => generateID(item, id));
    return { ...obj, listValue, id };
  }
  return { ...obj, id };
};

const generateUpdates = (
  obj: PropsFilter | PropsObjItem,
  preObj: PropsFilter | undefined
) => {
  const update = (newObj: PropsFilter) => {
    const list = preObj?.listValue;
    return preObj
      ? preObj?.update({
          ...preObj,
          listValue:
            preObj?.handleSelect?.(newObj, list) ||
            list?.map((obj) => (newObj.id === obj.id ? newObj : obj)),
        })
      : newObj;
  };

  const objModify = { ...obj, update };

  if (obj.type === "section") {
    const listValue: PropsObjItem[] = obj.listValue.map((item) =>
      generateUpdates(item, objModify)
    );
    return { ...objModify, listValue };
  }

  return objModify;
};

export const ModalMultipleChoice = ({
  updateSelect,
  listValues,
  ...rest
}: ModalMultipleChoiceProps) => {
  const [cloneList, setCloneList] = useState<PropsFilter[]>(
    listValues.map((obj) => generateUpdates(generateID(obj, "")))
  );

  const update = (newObj: PropsFilter) => {
    const newList = cloneList.map((obj) =>
      generateUpdates(obj.id === newObj.id ? newObj : obj)
    );
    setCloneList(newList);
  };

  const { callbackClose } = rest;

  return (
    <Modal {...rest} className="w-80 font-medium flex flex-col gap-3">
      {cloneList.map((obj, index) => {
        const isLastSection = cloneList.length <= index + 1;
        const canViewLine = obj.type === "section" && !isLastSection;
        return (
          <div className="flex flex-col gap-2">
            <RenderList obj={obj} updateObj={update} />
            {canViewLine && <hr className="h-px w-full bg-primary-300" />}
          </div>
        );
      })}

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
            updateSelect(cloneList);
            callbackClose();
          },
        }}
      />
    </Modal>
  );
};
