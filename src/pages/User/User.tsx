import { useAuth } from "../../AuthContext";

import { HeaderGame } from "../../common/HeaderGame";
import { Loading } from "../Loading";

import { UserForm } from "./UserForm";
import { api } from "../../api";
import { User as UserType } from "../../@types/auth";

const submit = async (fields: UserType) => {
  const { name, email } = fields;
  await api.patch("/users/me", { name, email });
};

export const User = () => {
  const { user } = useAuth();

  const values = {
    phone: "11111",
    appearance: "Light",
    work: "Estudante",
    language: "Português",
    two_auth: false,
  };

  if (!user) return <Loading />;

  return (
    <div className="bg-primary-100 text-primary-800">
      <HeaderGame namePage="Configurações" />
      <UserForm user={{ ...user, ...values }} submit={submit} />
    </div>
  );
};
