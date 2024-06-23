import { useEffect, useState } from "react";
import { api } from "../api";

export const useResource = <T>(path: string, list = []) => {
  const [resource, setResource] = useState<T>();

  async function getResource() {
    const res = await api.get<T>(path);
    setResource(res.data);
  }

  useEffect(() => {
    getResource();
  }, list);

  return resource;
};
