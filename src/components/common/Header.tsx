import "./styles/Header.scss";
import { useNavigate } from "react-router-dom";
import DarkModeButton from "./DarkModeButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { ThemeContext } from "../../App";
import { useCallback, useContext, useEffect, useState } from "react";

interface HeaderProps {
  isLoading: boolean;
}

const Header = ({ isLoading }: HeaderProps) => {
  const themeContext = useContext(ThemeContext);
  const nav = useNavigate();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNavigation = (path: string) => {
    if (isLoading) return;
    nav(path);
  };

  const handleScroll = useCallback((): void => {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > scrollPosition) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setScrollPosition(currentScrollPosition);
  }, [scrollPosition]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition, handleScroll]);

  return (
    <header
      className={`Header ${themeContext?.darkMode ? "dark" : "light"} ${
        isVisible ? "visible" : "hidden"
      }`}
    >
      <div onClick={() => nav("/")} className="Header__title">
        오늘의 솔루션
      </div>
      <div className="Header__title Header__menu">
        <DarkModeButton></DarkModeButton>
        <FormatListBulletedIcon
          sx={{ fontSize: 33 }}
          onClick={() => handleNavigation("/recordlist")}
        ></FormatListBulletedIcon>
      </div>
    </header>
  );
};

export default Header;
