import { useAuth } from "../../AuthContext";

import { HeaderGame } from "../../common/HeaderGame";
import { UserForm } from "./UserForm";
import { Loading } from "../Loading";

import { User as UserType } from "../../@types/auth";
import { api } from "../../api";

const submit = async (fields: UserType) => {
  const { name, email } = fields;
  await api.patch("/user/me", { name, email });
  window.location.reload();
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
