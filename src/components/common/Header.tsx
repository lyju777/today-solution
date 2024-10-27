import "./styles/Header.scss";
import { useNavigate } from "react-router-dom";
import DarkModeButton from "./DarkModeButton";
import { isLoggedIn, userData } from "../../util/loginCheck";
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

interface Props {
  isLoading?: boolean;
}

const Header = ({ isLoading }: Props) => {
  const themeContext = useContext(ThemeContext);
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
      // 로그아웃 로직
      alert("로그아웃 되었습니다.");
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
              src={userData.thumbnailImage}
            />
            <IconButton>
              <FormatListBulletedIcon
                sx={{ fontSize: 33 }}
                onClick={() => handleNavigation("/recordlist")}
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
