import { Search } from "../../../../common/Search";
import { useResource } from "../../../../common/useResource";
import { User } from "../../../../@types/auth";
import { CardUser } from "../CardUser";

export const PlayerContent = () => {
  const players = useResource<User[]>("/player");
  return (
    <>
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-primary-800">Todos Jogadores</h2>
        <Search />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {players?.map((player: User) => {
          return <CardUser key={player.id} {...player} />;
        })}
      </div>
    </>
  );
};
