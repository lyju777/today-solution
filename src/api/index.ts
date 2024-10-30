import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("access_token");

axios.defaults.withCredentials = true; // withCredentials 전역설정
export const instanse = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});
