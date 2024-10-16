import { useRef, useState } from "react";
import { InputText } from "../../../../../common/Input/inputCustom/InputText";
import { InputTextLine } from "../../../../Dashboard/components/InputTextLine";
import { Button } from "../../../../../common/Button/ButtonCustomn/Button";
import { IdType, TaskActivity } from "../../../type/activity";
import { useContent } from "../../../context/ContentContext";
import { ComponentProps } from "../common/EditItem";

type Props = {
  updateSelect: (value: IdType) => void;
  index: number;
};

type EditProps = {
  identify: string;
};

const TaskOneSelectEdit = ({ identify }: EditProps) => {
  const { updateData } = useContent();

  const [question, setQuestion] = useState("");
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  const resOption = useRef();
  const newId = useRef<number>(0);

  updateData(
    {
      id: identify,
      question,
      listAlternatives: list,
      resolution: resOption.current,
    },
    identify
  );

  return (
    <div className="h-full max-h-80 overflow-y-auto overflow-x-hidden w-full border-primary-600 border-2 border-solid rounded-2xl p-4 space-y-2">
      <InputText
        className="p-3.5 font-normal bg-primary-100 rounded-md border border-primary-600 border-solid"
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Aqui Entra a pergunta"
        value={question}
      />
      <ul className="text-base space-y-2">
        {list.map((obj) => (
          <li className="ml-5">
            <label className="flex items-center gap-2 cursor-pointer w-full">
              <div className="relative">
                <input
                  type="radio"
                  onChange={() => (resOption.current = obj.id)}
                  name={identify}
                  className="appearance-none border-2 border-solid border-primary-600 p-1 rounded-full peer"
                />
                <div className="hidden peer-checked:flex p-[0.175rem] bg-primary-600 rounded-full absolute top-[34%] left-[25%]" />
              </div>
              <InputTextLine
                value={obj.name}
                className="w-full h-max py-3 font-medium"
              />
            </label>
          </li>
        ))}
        <li>
          <form
            className="flex gap-2"
            noValidate
            onClick={(e) => e.preventDefault()}
          >
            <InputTextLine
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-max py-3 placeholder:text-primary-500"
              placeholder="Adicionar mais uma opção"
            />
            <Button
              onClick={() => {
                setList([
                  ...list,
                  { value: input, name: input, id: newId.current++ },
                ]);
                setInput("");
              }}
              className="w-max"
            >
              Salvar
            </Button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export const TaskOneSelect = ({
  listAlternatives,
  question,
  index,
}: TaskActivity & Props & ComponentProps) => {
  const { canEdit } = useContent();
  const number = useRef(0);

  const identify = `current_${number.current++}`;
  if (canEdit) return <TaskOneSelectEdit identify={identify} />;

  return (
    <div className="flex flex-col gap-2">
      <span>
        <h2 className="font-bold text-xl">
          {index + 1} - {question}
        </h2>
        <p className="text-sm text-primary-600 font-bold">*Opção única</p>
      </span>
      <ul className="text-base">
        {listAlternatives.map((obj) => (
          <li className="ml-5">
            <label className="flex items-center gap-2 cursor-pointer w-max">
              <div className="relative">
                <input
                  type="radio"
                  name={`${index}_option`}
                  className="appearance-none border-2 border-solid border-primary-600 p-1 rounded-full peer"
                />
                <div className="hidden peer-checked:flex p-[0.175rem] bg-primary-600 rounded-full absolute top-[34%] left-[25%]" />
              </div>
              <p className="font-medium">{obj.name}</p>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
