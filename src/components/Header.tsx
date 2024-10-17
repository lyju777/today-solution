import "./styles/Header.scss";
import { useNavigate } from "react-router-dom";
import DarkModeButton from "./DarkModeButton";

const Header = () => {
  const nav = useNavigate();
  return (
    <header className="Header">
      <div onClick={() => nav("/")} className="Header__title">
        오늘의 솔루션
      </div>
      <DarkModeButton></DarkModeButton>
    </header>
  );
};

export default Header;
