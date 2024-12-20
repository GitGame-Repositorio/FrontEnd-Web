import { TaskOneSelect } from "./activity/TaskOneSelect";
import { TaskActivity } from "../../type/activity";
import { Content } from "../../../../@types/game";
import { useContent } from "../../context/ContentContext";
import { TitleEdit } from "./common/TitleEdit";
import { SectionNewItem } from "./activity/SectionNewItem";
import { ButtonMenuFloat } from "../ButtonMenuFloat";
import { EditItem } from "./common/EditItem";
import { useState } from "react";
import { useFormContent } from "../../context/FormContent";

const objComponentActivity = {
  multipleOption: TaskOneSelect,
  singleOption: TaskOneSelect,
};

type Props = {
  tasks: TaskActivity[];
  allowComplete: () => void;
};

export const ActivityEdit = () => {
  const {
    register,
    formState: { errors },
  } = useFormContent();

  const { dataFormat } = useContent();
  const { rows, cols } = dataFormat;

  const [listComponents, setListComponents] = useState([
    SectionNewItem,
    SectionNewItem,
  ]);

  const listHandle = (component: any, index: number) => {
    return listComponents.map((obj, indexObj) =>
      index === indexObj ? component : obj
    );
  };

  return (
    <>
      <TitleEdit register={register} errors={errors} />

      <ButtonMenuFloat text="Layout" />

      <div className={`grid grid-cols-${cols} grid-rows-${rows} gap-6 flex-1`}>
        {listComponents?.map((component, index) => (
          <EditItem
            component={component}
            updateComponent={(newComponent) => {
              if (!newComponent) return null;
              setListComponents(listHandle(newComponent, index));
            }}
            resetComponent={() => {
              setListComponents(listHandle(SectionNewItem, index));
            }}
          />
        ))}
      </div>
    </>
  );
};

const ActivityView = ({ tasks, ...content }: Content) => {
  return (
    <>
      <p className="text-2xl font-bold">
        {content.numberOrder} - {content?.title}
      </p>
      {tasks?.map((obj: TaskActivity, index: number) => {
        const Component = objComponentActivity[obj.type];
        return (
          <Component
            {...obj}
            index={index}
            updateSelect={(value: number) => (select.current[index] = value)}
          />
        );
      })}
    </>
  );
};

export const Activity = (content: Props & Content) => {
  const { canEdit } = useContent();
  const Component = canEdit ? ActivityEdit : ActivityView;
  return (
    <div className="flex-1 flex flex-col gap-4 text-primary-950">
      <Component {...content} />
    </div>
  );
};
