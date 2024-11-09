import "./styles/Header.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DarkModeButton from "./DarkModeButton";
import { isLoggedIn } from "../../util/loginCheck";
import { getLogout } from "../../api/login";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Skeleton } from "@mui/material";
import { useDialogs } from "@toolpad/core/useDialogs";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/userContext";

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

interface Props {
  isLoading?: boolean;
}

const Header = ({ isLoading }: Props) => {
  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const { userData, token, loading, setLoading } = userContext;
  const nav = useNavigate();

  const dialogs = useDialogs();

  const [visible, setVisible] = useState(true);
  const positionRef = useRef(window.scrollY);

  const throttleScroll = useMemo(() => {
    return throttle(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        return;
      }
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
    if (token) {
      setLoading(false);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, userData, setLoading, token]);

  const handleNavigation = (path: string) => {
    if (isLoading) return;
    nav(path);
  };

  const handleLogin = () => {
    if (isLoading) return;
    nav("/login");
  };

  const handleLogout = async () => {
    if (isLoading) return;
    const confirmed = await dialogs.confirm("로그아웃 하시겠습니까?", {
      title: "로그아웃",
      okText: "확인",
      cancelText: "취소",
    });

    if (confirmed) {
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
        {loading ? (
          <>
            <Skeleton variant="circular" width={40} height={40} />
            <IconButton>
              <Skeleton variant="circular" width={33} height={33} />
            </IconButton>

            {/* <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} /> */}
          </>
        ) : isLoggedIn() ? (
          <>
            <Avatar
              onClick={handleLogout}
              alt="Remy Sharp"
              src={userData.thumbnailImage}
            />
            <IconButton onClick={() => handleNavigation("/recordlist")}>
              <FormatListBulletedIcon sx={{ fontSize: 33 }} />
            </IconButton>
          </>
        ) : (
          <div onClick={handleLogin}>Login</div>
        )}
        <DarkModeButton></DarkModeButton>
      </div>
    </header>
  );
};

export default Header;
