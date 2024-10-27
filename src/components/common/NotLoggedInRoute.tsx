import { Outlet, Navigate } from "react-router-dom";
import { isLoggedIn } from "../../util/loginCheck";

// 로그인하지 않은 유저만 접근 가능
const NotLoggedInRoute = () => {
  return !isLoggedIn() ? <Outlet /> : <Navigate to="/" />;
};

export default NotLoggedInRoute;
