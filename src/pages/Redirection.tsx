import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getLoginToken, getLoginUserData } from "../api/login";

const Redirection = () => {
  const nav = useNavigate();
  useEffect(() => {
    async function loginProcessing() {
      try {
        const code = new URL(window.location.href).searchParams.get("code");
        if (!code) return;
        await getLoginToken("login", code).then((response) => {
          Cookies.set("access_token", response.data.accessToken);
        });
        const token = Cookies.get("access_token");
        if (!token) return;
        await getLoginUserData("user", token).then((resonse) => {
          localStorage.setItem("userData", JSON.stringify(resonse.data));
        });
      } catch (error) {
        console.error(error);
      }
    }
    loginProcessing();
    setTimeout(() => {
      nav("/");
    }, 100);
  }, [nav]);

  return <></>;
};

export default Redirection;
