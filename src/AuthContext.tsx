import Cookies from "js-cookie";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "./api";
import { User } from "./@types/auth";

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
  const [user, setUser] = useState<User>();
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

  const registerToken = (token: string) => {
    Cookies.set("token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  const login = async (token: string) => {
    registerToken(token)
    await getUser();
  };

  console.log("render")

  const setTokenFromCookies = () => {
    const token = Cookies.get("token");
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  };

  const logout = async () => {
    Cookies.set("token", "");
    setUser(undefined);
    api.defaults.headers.common.Authorization = undefined;
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
        registerToken(token);
      }
    };
    
    main();
    getUser();
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
