import { ReactNode, createContext, useContext, useState } from "react";

type ContextProps = {
  children: ReactNode;
};

type MenuContext = {
  menuVisible: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  changeMenuVisible: () => void;
};

const authContext = createContext({} as MenuContext);

export const MenuContextProvider = ({ children }: ContextProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => !menuVisible && setMenuVisible(true);
  const closeMenu = () => menuVisible && setMenuVisible(false);
  const changeMenuVisible = () => setMenuVisible(!menuVisible);

  return (
    <authContext.Provider
      value={{
        menuVisible,
        openMenu,
        closeMenu,
        changeMenuVisible,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useMenu = () => {
  return useContext(authContext);
};
