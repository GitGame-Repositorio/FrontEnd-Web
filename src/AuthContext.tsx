import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";
import { User } from "./@types/auth.d";
import { VITE_API_URL } from "./env";
import { useRefreshStore } from "./common/useRefresh";
import { CommonProps } from "./@types/utils";

type AuthContext = {
  user?: User;
  isAdmin: boolean;
  imgPerfil: string;
  isLogged: boolean;
  isLoading: boolean;
  reloadPage: { register: string; refresh: () => void };
  reloadUser: () => void;
  logout: () => Promise<void>;
  login: (token: string) => void;
};

const authContext = createContext({} as AuthContext);

export const AuthContextProvider = ({ children }: CommonProps) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    const res = await api.get<User | undefined>("/user/me");
    setUser(res.data);
    setIsLoading(false);
  };

  const registerToken = (token: string) => {
    Cookies.set("token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const login = async (token: string) => {
    registerToken(token);
    await getUser();
  };

  const setTokenFromCookies = () => {
    const token = Cookies.get("token");
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  };

  const objRefresh = useRefreshStore();

  const logout = async () => {
    Cookies.set("token", "");
    setUser(undefined);
    api.defaults.headers.common.Authorization = undefined;
  };

  const isLogged = user?.type === "logged";
  const isAdmin = !!user?.admin;
  const imgPerfil = VITE_API_URL + user?.picture;

  useEffect(() => {
    const main = async () => {
      setTokenFromCookies();
      try {
        await getUser();
      } catch {
        const response = await api.post("/register/anonymous");
        const { token } = response.data;
        registerToken(token);
        getUser();
      }
    };

    main();
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin,
        isLogged,
        imgPerfil,
        isLoading,
        reloadPage: objRefresh,
        reloadUser: getUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
