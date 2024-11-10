import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getLoginToken } from "../api/login";
import { UserContext } from "../context/userContext";

const Redirection = () => {
  const nav = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    async function loginProcessing() {
      const { setUserData, setLoading } = userContext;
      try {
        const code = new URL(window.location.href).searchParams.get("code");
        if (!code) return;
        setLoading(true);
        const response = await getLoginToken("login", code);
        Cookies.set("access_token", response.data.accessToken);
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.userWrapper)
        );
        if (userContext) {
          setUserData(response.data.userWrapper);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    loginProcessing();
    setTimeout(() => {
      nav("/");
    }, 100);
  }, [nav, userContext]);

  return <></>;
};

export default Redirection;
