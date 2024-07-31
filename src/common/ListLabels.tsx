import { Label } from "./Label";

type PropsObjValues = {
  name: string;
  value: string;
};

type PropsList = {
  list: PropsObjValues[];
};

export const ListLabels = ({ list }: PropsList) => {
  return (
    <div className="flex flex-wrap h-full justify-end gap-2">
      {list.map(({ name, value }) => (
        <Label
          value={name}
          key={`label-${value}`}
          className="py-3 cursor-default"
        />
      ))}
    </div>
  );
};
