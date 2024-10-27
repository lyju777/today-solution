import Cookies from "js-cookie";

export function isLoggedIn() {
  return Cookies.get("access_token") ? true : false;
}

export const userData = JSON.parse(localStorage.getItem("userData") || "{}");
