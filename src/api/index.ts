import axios from "axios";

axios.defaults.withCredentials = true; // withCredentials 전역설정
axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}/api`; // baseURL 전역설정
export const requestAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default requestAxios;
