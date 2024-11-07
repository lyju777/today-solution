import axios from "axios";

const env = import.meta.env;

axios.defaults.withCredentials = true; // withCredentials 전역설정
export const instanse = axios.create({
  baseURL: env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
