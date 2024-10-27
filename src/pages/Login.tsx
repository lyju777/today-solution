import "../components/styles/Login.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Login = () => {
  const nav = useNavigate();

  const clientId = import.meta.env.VITE_REST_API_KEY;
  const redirectUri = import.meta.env.VITE_REDIRECT_URL;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&prompt=login`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <div className="Login">
      <h1>오늘의 솔루션</h1>
      <input type="button" onClick={handleLogin} className="loginButton" />
      <Button className="returnButton" onClick={() => nav("/")}>
        돌아가기
      </Button>
    </div>
  );
};

export default Login;
