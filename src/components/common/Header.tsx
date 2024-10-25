import "./styles/Header.scss";
import { useNavigate } from "react-router-dom";
import DarkModeButton from "./DarkModeButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { ThemeContext } from "../../App";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { throttle } from "lodash";

interface Props {
  isLoading?: boolean;
}

const Header = ({ isLoading }: Props) => {
  const themeContext = useContext(ThemeContext);
  const nav = useNavigate();

  const [visible, setVisible] = useState(true);
  const positionRef = useRef(window.scrollY);

  const throttleScroll = useMemo(() => {
    return throttle(() => {
      const currentScrollY = window.scrollY;
      console.log(`scroll position: ${positionRef.current}`);
      if (currentScrollY > positionRef.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      positionRef.current = currentScrollY;
    }, 200);
  }, []);

  const handleScroll = useCallback(() => {
    throttleScroll();
  }, [throttleScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleNavigation = (path: string) => {
    if (isLoading) return;
    nav(path);
  };

  return (
    <header
      className={`Header ${themeContext?.darkMode ? "dark" : "light"} ${
        visible ? "visible" : "hidden"
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
