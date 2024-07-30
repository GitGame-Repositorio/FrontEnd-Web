import { useAuth } from "../../AuthContext";

import { HeaderGame } from "../../common/HeaderGame";
import { UserForm } from "./UserForm";
import { Loading } from "../Loading";

import { User as UserType } from "../../@types/auth";
import { api } from "../../api";

const submit = async (fields: UserType) => {
  const { works, ...update } = fields;
  await api.patch("/user/me", update);
  works.length && (await api.post("/user/me/works", { works }));
  window.location.reload();
};

export const User = () => {
  const { user } = useAuth();

  if (!user) return <Loading />;

  return (
    <div className="bg-primary-100 text-primary-800">
      <HeaderGame namePage="Configurações" />
      <UserForm user={user} submit={submit} />
    </div>
  );
};
