import { useAuth } from "../../AuthContext";

export const HeaderAllCapters = () => {
  const { user, isLogged, logout } = useAuth();
  return (
    <div className="flex justify-between">
      <p>{user?.id}</p>
      <div>
        <p>{isLogged ? "Logado" : "Anonimo"}</p>
        {isLogged && (
          <p className="text-tertiary cursor-pointer" onClick={logout}>
            logout
          </p>
        )}
      </div>
    </div>
  );
};
