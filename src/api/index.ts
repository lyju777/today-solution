import axios from "axios";

axios.defaults.withCredentials = true; // withCredentials 전역설정
if (import.meta.env.MODE === "production") {
  axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}/api`; // prod 환경
} else {
  console.log(import.meta.env.VITE_BASE_URL);
  axios.defaults.baseURL = "/api"; // local 환경
}
export const requestAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default requestAxios;
