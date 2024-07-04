import { useAuth } from "../../AuthContext";

import { HeaderGame } from "../../common/HeaderGame";
import { useMenu } from "../../common/menuAction/useMenuAction";
import { Loading } from "../Loading";

import { UserForm } from "./UserForm";
import { api } from "../../api";
import { User as UserType } from "../../@types/auth";

const submit = async (field: UserType) => {
  await api.patch("/user", field);
};

export const User = () => {
  const { user } = useAuth();
  const menuAction = useMenu();

  const values = {
    phone: "11111",
    appearance: "Light",
    work: "Estudante",
    language: "Português",
    two_auth: false,
  };

  console.log(user)

  if (!user) return <Loading />;

  return (
    <div
      className="bg-primary-100 text-primary-800"
      onClick={menuAction.closeMenuPage}
    >
      <HeaderGame namePage="Configurações" menuActionHook={menuAction} />
      <UserForm user={{ ...user, ...values }} submit={submit} />
    </div>
  );
};
