import { useAuth } from "../../AuthContext";

export const HeaderAllCapters = () => {
  const { user, isLogged } = useAuth()
  return (
    <div className="flex justify-between">
      <p>{user?.id}</p>
      <p>{isLogged ? "Logado" : "Anonimo"}</p>
    </div>
  );
};
