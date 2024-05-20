import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export const HeaderAllCapters = () => {
  const { user, isLogged, logout } = useAuth();
  return (
    <div className="flex justify-between">
      <p>{user?.id}</p>
      <div>
        <p>{isLogged ? "Logado" : "Anonimo"}</p>
        {isLogged && (
          <Link
            to="/login"
            onClick={logout}
            className="text-tertiary cursor-pointer"
          >
            logout
          </Link>
        )}
      </div>
    </div>
  );
};
