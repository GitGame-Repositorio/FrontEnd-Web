import { ComponentType, useState } from "react";
import { MenuActionUser } from "./MenuActionUser";

export type MenuProps = {
  MenuAction: ComponentType;
  openMenu: () => void;
  closeMenu: () => void;
  closeMenuPage: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  changeMenuVisible: () => void;
};

export const useMenu = (): MenuProps => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => !menuVisible && setMenuVisible(true);
  const closeMenu = () => menuVisible && setMenuVisible(false);
  const changeMenuVisible = () => setMenuVisible(!menuVisible);

  const closeMenuPage = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target.dataset.menu !== "menu") {
      closeMenu();
    }
  };

  const MenuAction = () => {
    return <>{menuVisible && <MenuActionUser />}</>;
  };

  return {
    MenuAction,
    openMenu,
    closeMenu,
    closeMenuPage,
    changeMenuVisible,
  };
};
