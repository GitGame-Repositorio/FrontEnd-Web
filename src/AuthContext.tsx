import Cookies from "js-cookie";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";

type User = {
  email: string;
  name: string;
};

type AuthContext = {
  user?: User;
  isLogged: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  login: (token: string) => void;
};

type ContextProps = {
  children: ReactNode
}

const authContext = createContext({} as AuthContext);

export const AuthContextProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const login = (token: string) => {
    setUser(user);
    Cookies.set("token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const getUser = async () => {
    try {
      const res = await api.get<User | undefined>("/users/me");
      setUser(res.data);
    } catch {
      setUser(undefined);
    }
    setIsLoading(false);
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

  const isLogged = !!user;

  useEffect(() => {
    setTokenFromCookies();
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
