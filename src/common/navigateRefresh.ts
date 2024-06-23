import { useNavigate } from "react-router-dom";
import { api } from "../api";

export const useNavigateRefresh = async (path: string) => {
  const navigate = useNavigate();
  await api.post("/progress/me");
  navigate(path);
};
