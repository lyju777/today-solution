import "./styles/Header.scss";
import { useNavigate } from "react-router-dom";
import DarkModeButton from "./DarkModeButton";
import { isLoggedIn } from "../../util/loginCheck";
import { getLogout } from "../../api/login";
import Cookies from "js-cookie";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useDialogs } from "@toolpad/core/useDialogs";
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
import { Avatar, IconButton } from "@mui/material";
import { UserContext } from "../../context/userContext";

interface Props {
  isLoading?: boolean;
}

const Header = ({ isLoading }: Props) => {
  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const userData = userContext ? userContext.userData : null;
  const nav = useNavigate();

  const dialogs = useDialogs();

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

  const handleLogout = async () => {
    const confirmed = await dialogs.confirm("로그아웃 하시겠습니까?", {
      title: "로그아웃",
      okText: "확인",
      cancelText: "취소",
    });

    if (confirmed) {
      const token = Cookies.get("access_token");
      if (!token) return;
      getLogout("logout", token).then(() => {
        Cookies.remove("access_token");
        localStorage.removeItem("userData");
        nav("/");
      });
    }
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
        {isLoggedIn() ? (
          <>
            <Avatar
              onClick={handleLogout}
              alt="Remy Sharp"
              src={userData?.thumbnailImage}
            />
            <IconButton onClick={() => handleNavigation("/recordlist")}>
              <FormatListBulletedIcon
                sx={{ fontSize: 33 }}
              ></FormatListBulletedIcon>
            </IconButton>
          </>
        ) : (
          <div onClick={() => nav("/login")}>Login</div>
        )}
        <DarkModeButton></DarkModeButton>
      </div>
    </header>
  );
};

export default Header;
