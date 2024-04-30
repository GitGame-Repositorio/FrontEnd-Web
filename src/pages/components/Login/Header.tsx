import { Link } from "react-router-dom";

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className="grid grid-cols-3 items-center">
      <Link to="/" className="flex gap-2 items-center cursor-pointer">
        <img src="/arrow.svg" className="h-10" alt="Retornar" />
        <p className="text-primary text-lg">Retornar</p>
      </Link>
      <h1 className="title">{title}</h1>
    </div>
  );
};
