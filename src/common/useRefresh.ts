import { useState } from "react";

export const useRefresh = () => {
  const [upd, setUpd] = useState(true);
  const refresh = () => setUpd(!upd);
  return refresh;
};

export const useRefreshStore = () => {
  const [upd, setUpd] = useState("");
  const refresh = () => setUpd(String(Math.random()));
  return { register: upd, refresh };
};
