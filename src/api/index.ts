import axios from "axios";
axios.defaults.withCredentials = true; // withCredentials 전역설정
export const instanse = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
