import axios from "axios";
import { VITE_API_URL } from "./env";

export const api = axios.create({
  baseURL: VITE_API_URL || "http://localhost:3000",
});
