import "./styles/Header.scss";
import { useNavigate } from "react-router-dom";
import DarkModeButton from "./DarkModeButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { ThemeContext } from "../../App";
import { useContext } from "react";

const Header = () => {
  const themeContext = useContext(ThemeContext);
  const nav = useNavigate();
  return (
    <header className={`Header ${themeContext?.darkMode ? "dark" : "light"}`}>
      <div onClick={() => nav("/")} className="Header__title">
        오늘의 솔루션
      </div>
      <div className="Header__title Header__menu">
        <DarkModeButton></DarkModeButton>
        <FormatListBulletedIcon
          sx={{ fontSize: 33 }}
          onClick={() => nav("/recordlist")}
        ></FormatListBulletedIcon>
      </div>
    </header>
  );
};

export default Header;
