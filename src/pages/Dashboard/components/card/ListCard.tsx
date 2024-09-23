import { ReactElement } from "react";
import { User } from "../../../../@types/auth";
import { Report } from "../../../../@types/game";

type Record = Report | User;

export const ListCard = ({
  list,
  card: Card,
  className,
}: {
  list: Record[];
  card: ReactElement;
  className: string;
}) => {
  return (
    <div className={className}>
      {list?.map((record: Record) => (
        <Card key={record.id} {...record} />
      ))}
    </div>
  );
};
