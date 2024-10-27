import { Outlet, Navigate } from "react-router-dom";
import { isLoggedIn } from "../../util/loginCheck";

// 로그인한 유저만 접근 가능
const LoggedInRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default LoggedInRoute;
