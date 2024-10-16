import { useState } from "react";

import { useResource } from "../../../../common/useResource";
import { User } from "../../../../@types/auth";
import { Loading } from "../../../Loading";
import { ContentLogic } from "./ContentLogic";
import { ListCard } from "../card/ListCard";
import { classNameGrid } from "../../service/style";
import { CardPlayer } from "../card/cardUser/CardPlayer";
import { objFilterWorks } from "../../service/data";
import { useAuth } from "../../../../AuthContext";
import { MainContent } from "../MainContent";

export const PlayerContent = () => {
  const { reloadPage } = useAuth();

  const players = useResource<User[]>("/player", [reloadPage.register]);

  const [filter, setFilter] = useState([objFilterWorks]);

  if (!players) return <Loading />;

  return (
    <MainContent>
      <ContentLogic
        filter={filter}
        record={players}
        updateFilter={setFilter}
        createList={(list: User[]) => (
          <ListCard card={CardPlayer} list={list} className={classNameGrid} />
        )}
        orderProps={["name", "email"]}
        name="Todos Jogadores"
      />
    </MainContent>
  );
};
