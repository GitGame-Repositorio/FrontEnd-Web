import Cookies from "js-cookie";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "./api";

type User = {
  id: string;
  email: string;
  name: string;
  type: "anonymous" | "logged";
};

type AuthContext = {
  user?: User;
  isLogged: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  login: (token: string) => void;
};

type ContextProps = {
  children: ReactNode;
};

const authContext = createContext({} as AuthContext);

export const AuthContextProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    try {
      const res = await api.get<User | undefined>("/user/me");
      setUser(res.data);
    } catch {
      setUser(undefined);
    }
    setIsLoading(false);
  };

  const login = (token: string) => {
    Cookies.set("token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const setTokenFromCookies = () => {
    const token = Cookies.get("token");
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  };

  const logout = async () => {
    Cookies.set("token", "");
    setUser(undefined);
  };

  const isLogged = user?.type === "logged";

  useEffect(() => {
    const main = async () => {
      setTokenFromCookies();
      try {
        await api.get("/user/me");
      } catch {
        const response = await api.post("/register/anonymous");
        const { token } = response.data;
        login(token);
      }

      await getUser();
    };

    main();
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        isLogged,
        isLoading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
